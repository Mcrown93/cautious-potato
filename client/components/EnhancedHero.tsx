import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useLowEndDevice } from '@/hooks/useLowEndDevice';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface Particle {
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
  opacity: number;
  size: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
  energy: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function EnhancedHero() {
  // Determine whether to disable the costly WebGL/Canvas animation. We
  // disable the effect entirely on low‑end devices, when the user
  // prefers reduced motion, or when the 3D hero flag is turned off via
  // environment variables. See useFeatureFlags for details.
  const flags = useFeatureFlags();
  const isLowEnd = useLowEndDevice();
  const prefersReduced = usePrefersReducedMotion();
  const disable3d = isLowEnd || prefersReduced || !flags.hero3d;

  // Refs and state must be defined before any conditional returns so
  // they exist on every render. These will also be used in the
  // fallback branch. Even if the fallback is returned early, these
  // declarations will have been executed, avoiding reference errors.
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  // Render a static fallback when 3D hero is disabled. This avoids
  // initialising the canvas and particle system altogether, providing
  // improved performance on low‑end devices and when the user prefers
  // reduced motion. We reuse the same content structure but drop the
  // canvas and floating shapes.
  if (disable3d) {
    return (
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      >
        {/* Static gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-teal-950/20" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              We design, build, and grow{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                  results-driven websites
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 blur-lg rounded-lg -z-10 opacity-50" />
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Conversion-focused sites and SEO. Clear process, measurable outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur opacity-30 group-hover:opacity-60 transition-all duration-300" />
                <Button
                  size="lg"
                  asChild
                  className="relative bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 px-10 py-4 text-lg font-semibold rounded-full transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-teal-500/25"
                >
                  <Link to="/quote">Request a Quote</Link>
                </Button>
              </div>
              <div className="group relative">
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="relative border-2 border-slate-300/30 bg-slate-900/50 backdrop-blur-sm text-slate-300 hover:bg-slate-300 hover:text-slate-950 px-10 py-4 text-lg font-semibold rounded-full transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-slate-300"
                >
                  <Link to="/portfolio">View Work</Link>
                </Button>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-800/50">
              <p className="text-slate-400 text-sm mb-6">Trusted by growing businesses worldwide</p>
              <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
                {['TechCorp', 'InnovateLab', 'GrowthCo', 'ScaleUp', 'FutureWorks'].map((company) => (
                  <div key={company} className="relative">
                    <div className="w-28 h-10 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-lg flex items-center justify-center transition-all duration-300">
                      <span className="text-slate-400 text-xs font-medium transition-colors">
                        {company}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Simple scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-14 border-2 border-slate-400/50 rounded-full flex justify-center">
            <div className="w-2 h-4 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full mt-3 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
    };

    // Skip expensive setup when the effect is disabled
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles with 3D properties
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = window.innerWidth < 768 ? 40 : 80;
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width / dpr,
          y: Math.random() * canvas.height / dpr,
          z: Math.random() * 1000,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          dz: (Math.random() - 0.5) * 2,
          opacity: Math.random() * 0.6 + 0.2,
          size: Math.random() * 3 + 1,
          trail: [],
          energy: Math.random() * 0.3 + 0.1
        });
      }
    };

    // Skip expensive initialisation when disabled
    if (!disable3d) initParticles();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Advanced animation loop
    let lastTime = 0;
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (deltaTime > 100) { // Skip if too much time passed (tab inactive)
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Create dynamic gradient background based on mouse position
      const gradient = ctx.createRadialGradient(
        mousePos.x * canvas.width / dpr, 
        mousePos.y * canvas.height / dpr, 
        0,
        mousePos.x * canvas.width / dpr, 
        mousePos.y * canvas.height / dpr, 
        Math.max(canvas.width, canvas.height) / dpr
      );
      gradient.addColorStop(0, `rgba(20, 184, 166, ${0.1 + mousePos.y * 0.05})`);
      gradient.addColorStop(0.5, `rgba(6, 182, 212, ${0.05 + mousePos.x * 0.03})`);
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Update and draw particles with 3D projection
      particlesRef.current.forEach((particle, index) => {
        // Mouse attraction/repulsion effect
        const mouseForceX = (mousePos.x * canvas.width / dpr - particle.x) * 0.00005;
        const mouseForceY = (mousePos.y * canvas.height / dpr - particle.y) * 0.00005;
        const distance = Math.sqrt(
          Math.pow(mousePos.x * canvas.width / dpr - particle.x, 2) + 
          Math.pow(mousePos.y * canvas.height / dpr - particle.y, 2)
        );

        // Apply forces based on distance
        if (distance < 150) {
          particle.dx += mouseForceX * particle.energy;
          particle.dy += mouseForceY * particle.energy;
          particle.energy = Math.min(particle.energy * 1.02, 0.5);
        } else {
          particle.energy = Math.max(particle.energy * 0.98, 0.1);
        }

        // Update position with 3D projection
        particle.x += particle.dx;
        particle.y += particle.dy;
        particle.z += particle.dz;

        // 3D to 2D projection
        const perspective = 800;
        const projectedSize = (perspective / (perspective + particle.z)) * particle.size;
        const projectedOpacity = particle.opacity * (perspective / (perspective + particle.z));

        // Add to trail
        particle.trail.push({ 
          x: particle.x, 
          y: particle.y, 
          opacity: projectedOpacity * 0.3 
        });
        if (particle.trail.length > 8) {
          particle.trail.shift();
        }

        // Wrap around edges with smooth transition
        if (particle.x < -50) particle.x = canvas.width / dpr + 50;
        if (particle.x > canvas.width / dpr + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height / dpr + 50;
        if (particle.y > canvas.height / dpr + 50) particle.y = -50;
        if (particle.z < -500) particle.z = 500;
        if (particle.z > 500) particle.z = -500;

        // Draw particle trail
        particle.trail.forEach((point, trailIndex) => {
          const trailOpacity = point.opacity * (trailIndex / particle.trail.length);
          const trailSize = projectedSize * (trailIndex / particle.trail.length) * 0.5;
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(20, 184, 166, ${trailOpacity})`;
          ctx.fill();
        });

        // Draw main particle with glow effect
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, projectedSize * 3
        );
        glowGradient.addColorStop(0, `rgba(20, 184, 166, ${projectedOpacity})`);
        glowGradient.addColorStop(0.4, `rgba(6, 182, 212, ${projectedOpacity * 0.6})`);
        glowGradient.addColorStop(1, 'rgba(20, 184, 166, 0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, projectedSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Main particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, projectedSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${projectedOpacity})`;
        ctx.fill();
      });

      // Draw dynamic connections with enhanced visuals
      particlesRef.current.forEach((particle, i) => {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dz = (particle.z - other.z) * 0.1; // Factor in z-distance
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.15;
            const gradient = ctx.createLinearGradient(particle.x, particle.y, other.x, other.y);
            gradient.addColorStop(0, `rgba(20, 184, 166, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(6, 182, 212, ${opacity * 1.2})`);
            gradient.addColorStop(1, `rgba(20, 184, 166, ${opacity})`);

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay to ensure smooth loading. If the
    // effect is disabled we simply mark it as loaded without starting
    // requestAnimationFrame.
    setTimeout(() => {
      setIsLoaded(true);
      if (!disable3d) {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!media.matches) {
          animationRef.current = requestAnimationFrame(animate);
        }
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos.x, mousePos.y]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0">
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
        
        {/* Layered gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-teal-950/20" />
        <div 
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)`
          }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-96 h-96 border border-teal-500/10 rounded-full transition-all duration-1000 ease-out"
            style={{
              left: `${20 + mousePos.x * 10}%`,
              top: `${30 + mousePos.y * 10}%`,
              transform: `rotate(${mousePos.x * 45}deg) scale(${1 + mousePos.y * 0.2})`
            }}
          />
          <div 
            className="absolute w-64 h-64 border border-cyan-500/10 rounded-full transition-all duration-700 ease-out"
            style={{
              right: `${15 + mousePos.y * 8}%`,
              bottom: `${25 + mousePos.x * 8}%`,
              transform: `rotate(${-mousePos.y * 30}deg) scale(${1 + mousePos.x * 0.15})`
            }}
          />
        </div>
      </div>

      {/* Static fallback for reduced motion */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 motion-reduce:block hidden" />

      {/* Enhanced Content with parallax */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Animated heading with staggered reveal */}
          <div className="overflow-hidden mb-6">
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight transition-all duration-1200 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}>
              We design, build, and grow{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                  results-driven websites
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 blur-lg rounded-lg -z-10 opacity-50" />
              </span>
            </h1>
          </div>
          
          <div className="overflow-hidden mb-8">
            <p className={`text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1200 delay-300 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}>
              Conversion-focused sites and SEO. Clear process, measurable outcomes.
            </p>
          </div>

          {/* Enhanced CTAs with magnetic effect */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1200 delay-600 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur opacity-30 group-hover:opacity-60 transition-all duration-300" />
              <Button
                size="lg"
                asChild
                className="relative bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 px-10 py-4 text-lg font-semibold rounded-full transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-teal-500/25"
              >
                <Link to="/quote">Request a Quote</Link>
              </Button>
            </div>
            
            <div className="group relative">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="relative border-2 border-slate-300/30 bg-slate-900/50 backdrop-blur-sm text-slate-300 hover:bg-slate-300 hover:text-slate-950 px-10 py-4 text-lg font-semibold rounded-full transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-slate-300"
              >
                <Link to="/portfolio">View Work</Link>
              </Button>
            </div>
          </div>

          {/* Enhanced trust indicators with animated reveal */}
          <div className={`transition-all duration-1200 delay-900 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            <div className="pt-8 border-t border-slate-800/50">
              <p className="text-slate-400 text-sm mb-6">Trusted by growing businesses worldwide</p>
              <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
                {['TechCorp', 'InnovateLab', 'GrowthCo', 'ScaleUp', 'FutureWorks'].map((company, index) => (
                  <div 
                    key={company}
                    className={`group relative transition-all duration-500 delay-${index * 100}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-28 h-10 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-lg flex items-center justify-center group-hover:border-slate-600/50 group-hover:bg-slate-700/30 transition-all duration-300">
                      <span className="text-slate-400 text-xs font-medium group-hover:text-slate-300 transition-colors">
                        {company}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator with magnetic effect */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1200 delay-1200 ease-out ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <div className="group relative">
          <div className="w-8 h-14 border-2 border-slate-400/50 rounded-full flex justify-center group-hover:border-teal-400/70 transition-all duration-300">
            <div className="w-2 h-4 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full mt-3 animate-pulse group-hover:animate-bounce transition-all duration-300"></div>
          </div>
          <div className="absolute inset-0 bg-teal-400/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </section>
  );
}
