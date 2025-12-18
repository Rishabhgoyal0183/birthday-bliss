import { useMemo, useEffect, useState, useRef } from 'react';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Generate realistic starfield
  const stars = useMemo(() => {
    const starArray = [];
    
    // Tiny distant stars (most numerous)
    for (let i = 0; i < 150; i++) {
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
    for (let i = 0; i < 60; i++) {
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
    for (let i = 0; i < 15; i++) {
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

  const wishes = [
    "May your day sparkle with joy and laughter",
    "Wishing you dreams that touch the stars",
    "Here's to another year of beautiful adventures",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Reveal sections on scroll
      sectionsRef.current.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8;
          if (isVisible) {
            section.classList.add('section-visible');
            section.classList.remove('section-hidden');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Fixed starfield background */}
      <div className="fixed inset-0 overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(240 15% 2%) 0%, hsl(240 20% 4%) 50%, hsl(250 15% 3%) 100%)' }}>
        {/* Subtle ambient nebula effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 20% 30%, hsl(260 30% 15% / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, hsl(340 30% 12% / 0.2) 0%, transparent 50%)',
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
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section - Full Screen */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
          <div className="text-center animate-float-gentle">
            {/* Happy Birthday */}
            <h1 
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary mb-2"
              style={{
                opacity: 0,
                animation: 'fadeInScale 1.2s ease-out 0.5s forwards',
                textShadow: '0 0 40px hsl(43 74% 66% / 0.5)',
              }}
            >
              Happy Birthday
            </h1>
            
            {/* Chelsi */}
            <h2 
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gold-light animate-glow"
              style={{
                opacity: 0,
                animation: 'fadeInScale 1.2s ease-out 1s forwards',
              }}
            >
              Chelsi
            </h2>
            
            {/* Decorative */}
            <div 
              className="flex items-center justify-center gap-4 mt-6"
              style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease-out 1.5s forwards',
              }}
            >
              <span className="text-xl">🎂</span>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <span className="text-xl">✨</span>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <span className="text-xl">🎁</span>
            </div>

            {/* Scroll indicator */}
            <div 
              className="mt-16"
              style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease-out 2s forwards',
              }}
            >
              <button 
                onClick={() => scrollToSection('wishes')}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 flex flex-col items-center gap-2"
              >
                <span className="text-sm font-elegant tracking-widest uppercase">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
                  <div className="w-1.5 h-3 bg-primary/50 rounded-full animate-bounce" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Wishes Section */}
        <section 
          id="wishes" 
          className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
          ref={(el) => { sectionsRef.current[0] = el; }}
        >
          <div className="section-hidden max-w-2xl mx-auto text-center">
            <h3 className="font-elegant text-3xl md:text-4xl text-primary mb-12">
              ✨ Birthday Wishes ✨
            </h3>
            
            <div className="space-y-6">
              {wishes.map((wish, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl text-muted-foreground italic font-body"
                  style={{
                    animationDelay: `${0.3 + index * 0.2}s`,
                  }}
                >
                  "{wish}"
                </p>
              ))}
            </div>

            <p className="text-xl md:text-2xl text-rose font-elegant mt-10">
              💖 Have the most magical birthday! 💖
            </p>
          </div>
        </section>

        {/* Navigation Buttons Section */}
        <section 
          id="explore" 
          className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
          ref={(el) => { sectionsRef.current[1] = el; }}
        >
          <div className="section-hidden text-center max-w-4xl mx-auto">
            <h3 className="font-elegant text-3xl md:text-4xl text-primary mb-4">
              Explore More
            </h3>
            <p className="text-muted-foreground mb-12 font-body text-lg">
              Click on any card to discover special moments
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Memories Button */}
              <button 
                onClick={() => scrollToSection('memories')}
                className="group relative p-8 rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:scale-105 animate-pulse-glow"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-4xl mb-4 block">📸</span>
                <h4 className="font-elegant text-xl text-primary mb-2">Memories</h4>
                <p className="text-sm text-muted-foreground">Our beautiful moments together</p>
              </button>

              {/* Messages Button */}
              <button 
                onClick={() => scrollToSection('messages')}
                className="group relative p-8 rounded-2xl border border-rose/20 bg-card/30 backdrop-blur-sm hover:border-rose/50 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: '0.1s' }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-4xl mb-4 block">💌</span>
                <h4 className="font-elegant text-xl text-rose mb-2">Messages</h4>
                <p className="text-sm text-muted-foreground">Heartfelt wishes for you</p>
              </button>

              {/* Surprises Button */}
              <button 
                onClick={() => scrollToSection('surprise')}
                className="group relative p-8 rounded-2xl border border-accent/20 bg-card/30 backdrop-blur-sm hover:border-accent/50 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-4xl mb-4 block">🎁</span>
                <h4 className="font-elegant text-xl text-accent mb-2">Surprise</h4>
                <p className="text-sm text-muted-foreground">A special gift awaits</p>
              </button>
            </div>
          </div>
        </section>

        {/* Memories Section */}
        <section 
          id="memories" 
          className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
          ref={(el) => { sectionsRef.current[2] = el; }}
        >
          <div className="section-hidden text-center max-w-5xl mx-auto w-full">
            <h3 className="font-elegant text-3xl md:text-4xl text-primary mb-4">
              📸 Our Memories
            </h3>
            <p className="text-muted-foreground mb-12 font-body text-lg">
              Every moment with you is a treasure
            </p>

            {/* Photo Grid - Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item}
                  className="aspect-square rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm flex items-center justify-center group hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {/* Replace this div with your image */}
                  <div className="text-center p-4">
                    <span className="text-3xl mb-2 block opacity-50 group-hover:opacity-100 transition-opacity">🖼️</span>
                    <p className="text-xs text-muted-foreground">Memory {item}</p>
                    <p className="text-xs text-muted-foreground/50 mt-1">Add your photo here</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Memory Texts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="p-6 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-sm text-left">
                <p className="text-muted-foreground italic font-body">
                  "Remember that time when we... [Add your memory text here]"
                </p>
                <p className="text-primary/60 text-sm mt-3">— Your special day, 2024</p>
              </div>
              <div className="p-6 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-sm text-left">
                <p className="text-muted-foreground italic font-body">
                  "The day we laughed so hard... [Add your memory text here]"
                </p>
                <p className="text-primary/60 text-sm mt-3">— Another beautiful moment</p>
              </div>
            </div>
          </div>
        </section>

        {/* Messages Section */}
        <section 
          id="messages" 
          className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
          ref={(el) => { sectionsRef.current[3] = el; }}
        >
          <div className="section-hidden text-center max-w-3xl mx-auto">
            <h3 className="font-elegant text-3xl md:text-4xl text-rose mb-12">
              💌 A Special Message
            </h3>

            <div className="p-8 md:p-12 rounded-2xl border border-rose/20 bg-card/30 backdrop-blur-sm">
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

        {/* Surprise Section */}
        <section 
          id="surprise" 
          className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
          ref={(el) => { sectionsRef.current[4] = el; }}
        >
          <div className="section-hidden text-center max-w-2xl mx-auto">
            <h3 className="font-elegant text-3xl md:text-4xl text-accent mb-8">
              🎁 Your Special Surprise
            </h3>

            <div className="p-12 rounded-2xl border border-accent/20 bg-card/30 backdrop-blur-sm animate-float-gentle">
              <span className="text-6xl mb-6 block">🎉</span>
              <p className="text-lg text-muted-foreground font-body mb-6">
                [Add your surprise content here - maybe a gift reveal, a video link, 
                or something special you've planned for Chelsi]
              </p>
              <button className="btn-birthday">
                Click to Reveal ✨
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="py-20 text-center">
          <div className="animate-float-gentle">
            <span className="text-4xl">💖</span>
            <p className="text-muted-foreground font-elegant text-lg mt-4">
              Made with love for Chelsi
            </p>
            <p className="text-muted-foreground/50 text-sm mt-2">
              Happy Birthday! 🎂
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
