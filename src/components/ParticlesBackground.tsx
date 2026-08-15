import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 120,
      particles: {
        number: {
          value: 150,
          // v3 scales the count against a width x height reference area rather
          // than the old value_area number, which it ignores. 1920x1080 are the
          // engine defaults, written out here so the density is legible.
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
        },
        color: {
          value: ["#8fbca6"],
          // value: ["#9e48e7", "#06F1FF"],
          //['#9e48e7', '#fff', '#06F1FF']
        },
        shape: {
          type: "circle",
        },
        // v3 expresses per-particle variation as a value range, not a `random`
        // flag, which it ignores. Kept as a flat 0.3 to preserve the current
        // look; a { min, max } range here is what would vary it per particle.
        opacity: {
          value: 0.3,
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
        size: {
          value: { min: 2, max: 3 },
          animation: {
            enable: true,
            speed: 5,
            sync: false,
          },
        },
        links: {
          enable: true,
          distance: 100,
          color: "#ffffff",
          opacity: 0,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "out",
          },
          bounce: false,
          attract: {
            enable: false,
            rotate: {
              x: 3000,
              y: 3000,
            },
          },
        },
      },
      interactivity: {
        // The correct v3 key is detectsOn; the old detectOn was ignored, so
        // this has always been the engine default of "window". Kept as window
        // deliberately: the canvas sits at -z-10 behind the page content and
        // never receives pointer events, so "canvas" would kill hover entirely.
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 100,
            links: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 200,
            size: 80,
            duration: 0.4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            quantity: 4,
          },
          remove: {
            quantity: 2,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0 -z-10"
      />
    );
  }

  return null;
};

export default ParticlesBackground;
