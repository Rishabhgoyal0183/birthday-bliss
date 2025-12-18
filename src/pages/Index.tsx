import { useMemo } from 'react';

const Index = () => {
  // Generate stars
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 60; i++) {
      starArray.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() > 0.8 ? 'w-1.5 h-1.5' : 'w-1 h-1',
        delay: Math.random() * 3,
      });
    }
    return starArray;
  }, []);

  const wishes = [
    "May your day be filled with endless joy",
    "Wishing you beautiful moments and dreams come true",
    "Here's to another amazing adventure",
  ];

  return (
    <div className="h-screen w-screen bg-background relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full bg-star ${star.size} animate-twinkle`}
            style={{
              left: star.left,
              top: star.top,
              animationDelay: `${star.delay}s`,
              boxShadow: '0 0 6px 2px hsl(45 100% 95% / 0.6)',
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <div className="text-center px-4">
          {/* Happy Birthday */}
          <h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl text-primary mb-2 animate-fade-in-up"
            style={{
              textShadow: '0 0 30px hsl(43 74% 66% / 0.5)',
              animationDelay: '0.3s',
              animationFillMode: 'backwards',
            }}
          >
            Happy Birthday
          </h1>
          
          {/* Chelsi */}
          <h2 
            className="font-display text-5xl sm:text-6xl md:text-7xl text-gold-light mb-4 animate-fade-in-up animate-glow"
            style={{
              animationDelay: '0.7s',
              animationFillMode: 'backwards',
            }}
          >
            Chelsi
          </h2>
          
          {/* Decorative */}
          <div 
            className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up"
            style={{
              animationDelay: '1.1s',
              animationFillMode: 'backwards',
            }}
          >
            <span className="text-lg">🎂</span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-lg">✨</span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-lg">🎁</span>
          </div>
          
          {/* Wishes */}
          <div className="space-y-2 max-w-md mx-auto">
            {wishes.map((wish, index) => (
              <p
                key={index}
                className="text-sm md:text-base text-muted-foreground italic animate-fade-in-up"
                style={{
                  animationDelay: `${1.5 + index * 0.3}s`,
                  animationFillMode: 'backwards',
                }}
              >
                "{wish}"
              </p>
            ))}
          </div>
          
          {/* Final message */}
          <p 
            className="text-base md:text-lg text-rose font-elegant mt-4 animate-fade-in-up"
            style={{
              animationDelay: '2.8s',
              animationFillMode: 'backwards',
            }}
          >
            ✨ Have the most magical birthday! ✨
          </p>
          
          {/* Heart */}
          <div 
            className="mt-4 animate-fade-in-up"
            style={{
              animationDelay: '3.3s',
              animationFillMode: 'backwards',
            }}
          >
            <span className="text-2xl animate-pulse">💖</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
