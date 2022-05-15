import { useEffect } from "react";

export default function useIntersectionObserver({
  target,
  intersectHandler,
  threshold = 1,
  rootMargin = "0px",
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(intersectHandler, {
      threshold,
      rootMargin,
    });
    const current = target.current;
    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  });
}
