'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'fade' | 'wipe' | 'cover';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Milliseconds. Use for staggering siblings. */
  delay?: number;
  className?: string;
  as?: ElementType;
  /** Replay the animation every time it re-enters the viewport. */
  repeat?: boolean;
  /** 0–1. Higher means the element must be further into view. */
  threshold?: number;
}

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className = '',
  as: Tag = 'div',
  repeat = false,
  threshold = 0.18,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!repeat) observer.unobserve(entry.target);
        } else if (repeat) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [repeat, threshold]);

  return (
    <Tag
      ref={ref as never}
      data-reveal={variant}
      className={`${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/**
 * Splits a headline into words and lifts them in one after another.
 * Used once per page — on the thing the reader should look at first.
 */
export function StaggerText({
  text,
  className = '',
  as: Tag = 'span',
  delay = 0,
  step = 70,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  step?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block will-change-transform"
            style={{
              transform: visible ? 'translateY(0)' : 'translateY(105%)',
              opacity: visible ? 1 : 0,
              transition: `transform .9s cubic-bezier(.16,1,.3,1) ${delay + i * step}ms, opacity .7s ease ${
                delay + i * step
              }ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
