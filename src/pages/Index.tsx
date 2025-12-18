import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { Camera, MessageCircle, Gift, Music, Heart, Star, Cake, Sparkles } from 'lucide-react';

const Index = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Generate confetti particles
  const confettiParticles = useMemo(() => {
    if (!showConfetti) return [];
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      type: ['gold', 'rose', 'accent', 'star'][Math.floor(Math.random() * 4)],
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
    }));
  }, [showConfetti]);

  // Generate realistic starfield
  const stars = useMemo(() => {
    const starArray = [];
    
    // Tiny distant stars (most numerous)
    for (let i = 0; i < 200; i++) {
      starArray.push({
        id: `tiny-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        type: 'tiny',
        delay: Math.random() * 5,
      });
    }
    
    // Small stars
    for (let i = 0; i < 80; i++) {
      starArray.push({
        id: `small-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        type: 'small',
        delay: Math.random() * 4,
      });
    }
    
    // Bright stars (few)
    for (let i = 0; i < 20; i++) {
      starArray.push({
        id: `bright-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 2,
        opacity: Math.random() * 0.3 + 0.7,
        type: 'bright',
        delay: Math.random() * 3,
      });
    }
    
    return starArray;
  }, []);

  // Floating ambient particles
  const ambientParticles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 3,
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.85;
          if (isVisible) {
            section.classList.add('section-visible');
            section.classList.remove('section-hidden');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create floating heart on click
  const createFloatingHeart = useCallback((e: React.MouseEvent) => {
    const id = Date.now();
    setFloatingHearts(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== id));
    }, 3000);
  }, []);

  // Create sparkle burst
  const createSparkles = useCallback((x: number, y: number) => {
    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 100,
      y: y + (Math.random() - 0.5) * 100,
    }));
    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 800);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSurpriseReveal = (e: React.MouseEvent) => {
    if (!surpriseRevealed) {
      setSurpriseRevealed(true);
      setShowConfetti(true);
      createSparkles(e.clientX, e.clientY);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  const memories = [
    { title: "Our First Meeting", description: "The moment that started it all. Add your special memory here..." },
    { title: "Adventures Together", description: "All the fun times we've shared. Replace with your own text..." },
    { title: "Special Moments", description: "Those little moments that mean everything. Customize this..." },
    { title: "Laughs & Smiles", description: "The joy you bring to everyone around you. Add your text..." },
  ];

  return (
    <div className="relative" onClick={createFloatingHeart}>
      {/* Confetti */}
      {showConfetti && confettiParticles.map((particle) => (
        <div
          key={particle.id}
          className={`confetti confetti-${particle.type}`}
          style={{
            left: particle.left,
            top: '-20px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        />
      ))}

      {/* Floating Hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{ left: heart.x, top: heart.y }}
        >
          💖
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle-particle"
          style={{ left: sparkle.x, top: sparkle.y }}
        />
      ))}

      {/* Fixed starfield background */}
      <div className="fixed inset-0 overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(240 15% 3%) 0%, hsl(250 20% 5%) 40%, hsl(260 15% 4%) 100%)' }}>
        {/* Subtle ambient nebula effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 20% 20%, hsl(260 30% 12% / 0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, hsl(340 30% 10% / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, hsl(280 20% 8% / 0.2) 0%, transparent 70%)',
          }}
        />
        
        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${
              star.type === 'bright' ? 'animate-twinkle-bright' : 
              star.type === 'small' ? 'animate-twinkle-micro' : 'animate-twinkle-slow'
            }`}
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              background: star.type === 'bright' 
                ? 'radial-gradient(circle, hsl(45 100% 98%) 0%, hsl(45 80% 90%) 50%, transparent 100%)'
                : 'hsl(45 100% 95%)',
              boxShadow: star.type === 'bright' 
                ? `0 0 ${star.size * 3}px ${star.size}px hsl(45 100% 90% / 0.4)`
                : star.type === 'small'
                ? `0 0 ${star.size * 2}px hsl(45 100% 95% / 0.3)`
                : 'none',
            }}
          />
        ))}

        {/* Floating ambient particles */}
        {ambientParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float-gentle"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'radial-gradient(circle, hsl(43 74% 66% / 0.3) 0%, transparent 70%)',
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
          <div className="text-center">
            {/* Decorative rotating element */}
            <div className="absolute top-1/4 left-1/4 w-20 h-20 animate-rotate-slow opacity-20">
              <Star className="w-full h-full text-primary" strokeWidth={0.5} />
            </div>
            <div className="absolute bottom-1/4 right-1/4 w-16 h-16 animate-rotate-slow opacity-15" style={{ animationDirection: 'reverse' }}>
              <Sparkles className="w-full h-full text-rose" strokeWidth={0.5} />
            </div>

            {/* Wishing you a */}
            <p 
              className="font-elegant text-lg md:text-xl tracking-[0.3em] text-rose uppercase mb-4"
              style={{ opacity: 0, animation: 'fadeInUp 1s ease-out 0.3s forwards' }}
            >
              Wishing you a
            </p>
            
            {/* Happy Birthday */}
            <h1 
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary mb-2 hover:scale-105 transition-transform duration-500 cursor-default"
              style={{
                opacity: 0,
                animation: 'fadeInScale 1.2s ease-out 0.6s forwards',
                textShadow: '0 0 40px hsl(43 74% 66% / 0.6), 0 0 80px hsl(43 74% 66% / 0.3)',
              }}
            >
              Happy Birthday
            </h1>
            
            {/* Chelsi */}
            <h2 
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gold-light animate-glow hover:scale-110 transition-transform duration-500 cursor-default"
              style={{ opacity: 0, animation: 'fadeInScale 1.2s ease-out 1s forwards' }}
            >
              Chelsi
            </h2>
            
            {/* Decorative icons - now interactive */}
            <div 
              className="flex items-center justify-center gap-4 mt-8"
              style={{ opacity: 0, animation: 'fadeInUp 1s ease-out 1.4s forwards' }}
            >
              <Star className="w-5 h-5 text-gold-light animate-bounce-subtle" strokeWidth={1.5} style={{ animationDelay: '0s' }} />
              <Cake className="w-6 h-6 text-rose animate-wobble" strokeWidth={1.5} />
              <Heart className="w-5 h-5 text-rose/70 animate-pulse" fill="currentColor" strokeWidth={1.5} />
              <Gift className="w-6 h-6 text-rose animate-bounce-subtle" strokeWidth={1.5} style={{ animationDelay: '0.3s' }} />
              <Star className="w-5 h-5 text-gold-light animate-bounce-subtle" strokeWidth={1.5} style={{ animationDelay: '0.6s' }} />
            </div>

            {/* Wish message */}
            <p 
              className="max-w-xl mx-auto mt-10 text-muted-foreground font-body text-lg md:text-xl leading-relaxed"
              style={{ opacity: 0, animation: 'fadeInUp 1s ease-out 1.8s forwards' }}
            >
              On this special day, may your heart be filled with joy and your life be blessed with countless beautiful moments.
            </p>

            {/* Scroll hint */}
            <div 
              className="mt-16"
              style={{ opacity: 0, animation: 'fadeInUp 1s ease-out 2.2s forwards' }}
            >
              <button 
                onClick={() => scrollToSection('wishes')}
                className="text-muted-foreground hover:text-primary transition-all duration-300 flex flex-col items-center gap-2 group"
              >
                <span className="text-sm font-elegant tracking-widest uppercase group-hover:tracking-[0.4em] transition-all">Scroll Down</span>
                <svg className="w-6 h-6 text-primary/50 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Extended Wishes Section */}
        <section 
          id="wishes" 
          ref={(el) => { sectionsRef.current[0] = el; }}
          className="section-hidden min-h-screen flex flex-col items-center justify-center px-4 py-20"
        >
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-6">
              On this special day, may your heart be filled with joy and your life be blessed with countless beautiful moments.
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
              May all your dreams come true and may this year bring you{' '}
              <span className="text-rose animate-pulse inline-block">love</span>,{' '}
              <span className="text-primary animate-pulse inline-block" style={{ animationDelay: '0.3s' }}>happiness</span>, and{' '}
              <span className="text-rose animate-pulse inline-block" style={{ animationDelay: '0.6s' }}>endless blessings</span>.
            </p>

            {/* Special message button */}
            <div className="mt-12">
              <div 
                className="shine-effect inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/50 bg-card/50 backdrop-blur-sm hover-lift cursor-default"
                style={{ boxShadow: '0 0 30px hsl(43 74% 66% / 0.3), 0 0 60px hsl(43 74% 66% / 0.1)' }}
              >
                <span className="text-primary text-xl animate-bounce-subtle">✨</span>
                <span className="font-display text-2xl md:text-3xl text-primary">You are truly special</span>
                <span className="text-primary text-xl animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>✨</span>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <button 
                onClick={() => scrollToSection('explore')}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 flex flex-col items-center gap-2 group"
              >
                <Heart className="w-5 h-5 text-rose/60 group-hover:scale-125 transition-transform" fill="currentColor" />
                <span className="text-sm font-elegant tracking-widest uppercase">Scroll to Explore</span>
                <span className="text-xs text-muted-foreground/60 font-body italic">With love and warm wishes</span>
                <div className="mt-2">
                  <svg className="w-6 h-6 text-primary/50 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Explore Section */}
        <section 
          id="explore" 
          ref={(el) => { sectionsRef.current[1] = el; }}
          className="section-hidden min-h-screen flex flex-col items-center justify-center px-4 py-20"
        >
          <div className="text-center max-w-4xl mx-auto">
            <Heart className="w-8 h-8 text-rose/60 mx-auto mb-4 animate-pulse" fill="currentColor" />
            <h3 className="font-elegant text-3xl md:text-4xl text-foreground mb-3">
              Explore Something Special
            </h3>
            <p className="text-muted-foreground mb-12 font-body text-lg italic">
              Click to discover more
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              {/* Memories Button */}
              <button 
                onClick={() => scrollToSection('memories')}
                className="btn-interactive group flex items-center justify-center gap-3 px-8 py-5 rounded-full border border-primary/30 bg-card/30 backdrop-blur-sm hover:border-primary/60 transition-all duration-500 hover:scale-105 card-glow"
              >
                <Camera className="w-5 h-5 text-primary group-hover:animate-bounce-subtle" strokeWidth={1.5} />
                <span className="font-elegant text-lg text-foreground">Memories</span>
              </button>

              {/* Wishes Button */}
              <button 
                onClick={() => scrollToSection('messages')}
                className="btn-interactive group flex items-center justify-center gap-3 px-8 py-5 rounded-full border border-primary/30 bg-card/30 backdrop-blur-sm hover:border-primary/60 transition-all duration-500 hover:scale-105 card-glow"
              >
                <MessageCircle className="w-5 h-5 text-primary group-hover:animate-wobble" strokeWidth={1.5} />
                <span className="font-elegant text-lg text-foreground">Wishes</span>
              </button>

              {/* Surprises Button */}
              <button 
                onClick={() => scrollToSection('surprise')}
                className="btn-interactive group flex items-center justify-center gap-3 px-8 py-5 rounded-full border border-primary/30 bg-card/30 backdrop-blur-sm hover:border-primary/60 transition-all duration-500 hover:scale-105 card-glow"
              >
                <Gift className="w-5 h-5 text-primary group-hover:animate-bounce-subtle" strokeWidth={1.5} />
                <span className="font-elegant text-lg text-foreground">Surprises</span>
              </button>
            </div>

            {/* Our Song Button - Featured */}
            <button 
              onClick={() => scrollToSection('song')}
              className="shine-effect btn-interactive group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-primary/50 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:scale-105"
              style={{ boxShadow: '0 0 30px hsl(43 74% 66% / 0.2)' }}
            >
              <Music className="w-5 h-5 text-primary group-hover:animate-bounce-subtle" strokeWidth={1.5} />
              <span className="font-elegant text-lg text-foreground">Our Song</span>
            </button>
          </div>
        </section>

        {/* Memories Section */}
        <section 
          id="memories" 
          ref={(el) => { sectionsRef.current[2] = el; }}
          className="section-hidden min-h-screen flex flex-col items-center justify-center px-4 py-20"
        >
          <div className="text-center max-w-6xl mx-auto w-full">
            <div className="flex items-center justify-center gap-4 mb-3">
              <Star className="w-5 h-5 text-primary/60 animate-rotate-slow" strokeWidth={1.5} />
              <h3 className="font-display text-4xl md:text-5xl text-primary">Our Memories</h3>
              <Star className="w-5 h-5 text-primary/60 animate-rotate-slow" strokeWidth={1.5} style={{ animationDirection: 'reverse' }} />
            </div>
            <p className="text-muted-foreground mb-12 font-body text-lg italic">
              A collection of precious moments we've shared together
            </p>

            {/* Photo Grid with Memory Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {memories.map((memory, index) => (
                <div key={index} className="space-y-4 group">
                  {/* Photo Placeholder */}
                  <div 
                    className="aspect-[4/3] rounded-xl border border-primary/20 bg-card/30 backdrop-blur-sm flex flex-col items-center justify-center hover:border-primary/40 transition-all duration-500 card-glow hover-lift"
                    style={{ 
                      borderTopRightRadius: '2rem',
                      background: 'linear-gradient(145deg, hsl(240 15% 6% / 0.8), hsl(240 15% 4% / 0.9))'
                    }}
                  >
                    <Camera className="w-12 h-12 text-muted-foreground/40 mb-3 group-hover:text-primary/60 transition-colors group-hover:animate-bounce-subtle" strokeWidth={1} />
                    <p className="text-muted-foreground/60 font-body text-sm group-hover:text-muted-foreground/80 transition-colors">Add your photo here</p>
                  </div>
                  
                  {/* Memory Text */}
                  <div className="text-left px-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-rose/70 group-hover:animate-pulse" fill="currentColor" />
                      <h4 className="font-elegant text-xl text-foreground">{memory.title}</h4>
                    </div>
                    <p className="text-muted-foreground/80 font-body text-sm leading-relaxed">
                      {memory.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Messages Section */}
        <section 
          id="messages" 
          ref={(el) => { sectionsRef.current[3] = el; }}
          className="section-hidden min-h-screen flex flex-col items-center justify-center px-4 py-20"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="font-display text-4xl md:text-5xl text-rose mb-12 flex items-center justify-center gap-3">
              <span className="animate-wobble">💌</span> A Special Message
            </h3>

            <div className="p-8 md:p-12 rounded-2xl border border-rose/20 bg-card/30 backdrop-blur-sm card-glow hover-lift">
              <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-6">
                Dear Chelsi,
              </p>
              <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-6">
                [Write your heartfelt message here. Tell her how much she means to you, 
                share your favorite memories together, and wish her the best for the year ahead.]
              </p>
              <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-6">
                [Add more paragraphs as needed. Make it personal and from the heart.]
              </p>
              <p className="text-xl text-rose font-elegant mt-8">
                With all my love,<br />
                [Your name]
              </p>
            </div>
          </div>
        </section>

        {/* Song Section */}
        <section 
          id="song" 
          ref={(el) => { sectionsRef.current[4] = el; }}
          className="section-hidden min-h-[50vh] flex flex-col items-center justify-center px-4 py-20"
        >
          <div className="text-center max-w-2xl mx-auto">
            <Music className="w-12 h-12 text-primary mx-auto mb-4 animate-bounce-subtle" strokeWidth={1.5} />
            <h3 className="font-display text-3xl md:text-4xl text-primary mb-8">
              Our Song
            </h3>

            <div className="p-8 rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-sm card-glow hover-lift">
              <p className="text-muted-foreground font-body mb-6">
                [Add a music player embed or link to your special song here]
              </p>
            </div>
          </div>
        </section>

        {/* Surprise Section */}
        <section 
          id="surprise" 
          ref={(el) => { sectionsRef.current[5] = el; }}
          className="section-hidden min-h-screen flex flex-col items-center justify-center px-4 py-20"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-display text-4xl md:text-5xl text-accent mb-8 flex items-center justify-center gap-3">
              <span className="animate-bounce-subtle">🎁</span> Your Special Surprise
            </h3>

            <div className={`p-12 rounded-2xl border border-accent/20 bg-card/30 backdrop-blur-sm transition-all duration-700 ${surpriseRevealed ? 'card-glow' : 'animate-float-gentle'}`}>
              {!surpriseRevealed ? (
                <>
                  <span className="text-6xl mb-6 block animate-wobble">🎉</span>
                  <p className="text-lg text-muted-foreground font-body mb-6">
                    Something special awaits you...
                  </p>
                  <button 
                    onClick={handleSurpriseReveal}
                    className="btn-birthday pulse-ring"
                  >
                    Click to Reveal ✨
                  </button>
                </>
              ) : (
                <div className="animate-fade-in-scale">
                  <span className="text-6xl mb-6 block">🎊</span>
                  <h4 className="font-display text-3xl text-primary mb-4">Surprise!</h4>
                  <p className="text-lg text-muted-foreground font-body mb-6">
                    [Add your surprise content here - maybe a gift reveal, a video link, 
                    or something special you've planned for Chelsi]
                  </p>
                  <div className="flex items-center justify-center gap-2 text-rose">
                    <Heart className="w-5 h-5 animate-pulse" fill="currentColor" />
                    <span className="font-elegant text-xl">Made with love for you</span>
                    <Heart className="w-5 h-5 animate-pulse" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 text-center px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-4 h-4 text-primary/50 animate-twinkle-bright" />
            <Heart className="w-5 h-5 text-rose/70 animate-pulse" fill="currentColor" />
            <Star className="w-4 h-4 text-primary/50 animate-twinkle-bright" />
          </div>
          <p className="text-muted-foreground/60 font-body text-sm">
            Made with love for your special day
          </p>
          <p className="text-muted-foreground/40 font-body text-xs mt-2">
            Happy Birthday, Chelsi! 🎂
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
