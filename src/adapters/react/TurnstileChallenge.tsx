/**
 * React Adapter for Turnstile UX Kit
 */

import { useEffect, useRef, useState } from 'react';
import type { ChallengeOptions, ChallengeController, TelemetryEvent } from '../sdk/index.js';

export interface TurnstileChallengeProps extends Omit<ChallengeOptions, 'containerId'> {
  onReady?: () => void;
}

export function TurnstileChallenge(props: TurnstileChallengeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<ChallengeController | null>(null);

  const uniqueId = `turnstile-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { initChallenge } = await import('../sdk/index.js');

      if (!mounted || !containerRef.current) return;

      const controller = initChallenge({
        ...props,
        containerId: uniqueId
      });

      controllerRef.current = controller;

      const checkReady = setInterval(() => {
        if (controller.isReady()) {
          clearInterval(checkReady);
          if (mounted) {
            controller.render();
            props.onReady?.();
          }
        }
      }, 100);

      return () => clearInterval(checkReady);
    };

    init();

    return () => {
      mounted = false;
      controllerRef.current?.destroy();
    };
  }, []);

  const prevControllerRef = useRef<ChallengeController | null>(null);

  useEffect(() => {
    if (controllerRef.current && prevControllerRef.current !== controllerRef.current) {
      prevControllerRef.current = controllerRef.current;
    }
  });

  return <div ref={containerRef} id={uniqueId} />;
}

export function useTurnstileTelemetry() {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);

  const addEventListener = (controller: ChallengeController | null) => {
    if (!controller) return () => {};

    const handler = (event: TelemetryEvent) => {
      setEvents((prev: TelemetryEvent[]) => [...prev, event]);
    };

    controller.onTelemetry(handler);

    return () => {};
  };

  return { events, addEventListener };
}
