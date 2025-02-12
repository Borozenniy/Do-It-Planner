import React, { useEffect, useRef, useState } from 'react';

interface ParticlesProps {
  color: string;
  x: number;
  y: number;
  diameter: number;
  tilt: number;
  tiltAngleIncrement: number;
  tiltAngle: number;
}

interface ConfettiProps {
  parentRef: React.RefObject<HTMLDivElement>;
}

const ANIMATION_TIME_DURATION = 4600;
const ANIMATION_START_DELAY = 250;
const ANIMATION_CYCLE = 5.5;
const MAX_PARTICLES = 30;
const PARTICLE_SPEED = 0.25;
const FALLING_ANGLE = 1;
const MAX_AMOUNT_OF_PARTICLES = MAX_PARTICLES * ANIMATION_CYCLE;
const COLORS = [
  '#FF80DB',
  '#9747FF',
  '#808CD7',
  '#98A6FD',
  '#4CDA68',
  '#51B5EB',
  '#B9EED9',
  '#20A19D',
  '#C6E7FF',
  '#2DCDC7',
  '#04D1A1',
  '#DBE1FF',
];

const Confetti = ({ parentRef }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles] = useState<ParticlesProps[]>([]);
  const [animationTimer, setAnimationTimer] = useState<number | null>(null);
  const particlesGenerated = useRef<number>(0);

  const resetParticle = (
    particle: ParticlesProps,
    width: number,
    height: number
  ) => {
    particle.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = 0;
    return particle;
  };

  const drawParticles = (context: any) => {
    particles.forEach((particle) => {
      context.beginPath();
      context.lineWidth = particle.diameter;
      context.strokeStyle = particle.color;
      const x = particle.x + particle.tilt;
      context.moveTo(x + particle.diameter / 2, particle.y);
      context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
      context.stroke();
    });
  };

  const updateParticles = (width: number, height: number) => {
    particlesGenerated.current += 1;
    particles.forEach((particle, index) => {
      particle.tiltAngle += particle.tiltAngleIncrement;
      particle.x += Math.random() * FALLING_ANGLE;
      particle.y += particle.diameter * PARTICLE_SPEED;
      particle.tilt = Math.sin(particle.tiltAngle) * 10;
      if (particlesGenerated.current > MAX_AMOUNT_OF_PARTICLES) {
        return;
      }
      if (
        particle.x > width + 5 ||
        particle.x < -5 ||
        particle.y > height + 5
      ) {
        if (particles.length <= MAX_PARTICLES) {
          resetParticle(particle, width, height);
        } else {
          particles.splice(index, 1);
        }
      }
    });
  };

  const startConfetti = () => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!parent || !canvas) return;
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    while (particles.length < MAX_PARTICLES) {
      particles.push(
        resetParticle(
          {
            color: '',
            x: 0,
            y: 0,
            diameter: 0,
            tilt: 0,
            tiltAngleIncrement: 0,
            tiltAngle: 0,
          },
          width,
          height
        )
      );
    }
    if (animationTimer === null) {
      const runAnimation = () => {
        context?.clearRect(0, 0, width, height);
        if (particles.length === 0) {
          setAnimationTimer(null);
        } else {
          updateParticles(width, height);
          drawParticles(context);
          setAnimationTimer(requestAnimationFrame(runAnimation));
        }
      };
      runAnimation();
    }
  };

  useEffect(() => {
    const timerBeforeStart = setTimeout(() => {
      startConfetti();
      const animationDuration = setTimeout(() => {
        if (animationTimer) cancelAnimationFrame(animationTimer);
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext('2d');
          if (context) context.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, ANIMATION_TIME_DURATION);
      return () => clearTimeout(animationDuration);
    }, ANIMATION_START_DELAY);
    return () => clearTimeout(timerBeforeStart);
  }, [animationTimer]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Confetti;
