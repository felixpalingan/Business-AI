import anime from "animejs";

export function animateCounter(
  targetElement: HTMLElement | null,
  targetValue: number,
  isDecimal: boolean = false,
  duration: number = 1600
) {
  if (!targetElement) return;

  const obj = { value: 0 };

  anime({
    targets: obj,
    value: targetValue,
    round: isDecimal ? 10 : 1,
    easing: "easeOutExpo",
    duration: duration,
    update: function () {
      if (targetElement) {
        targetElement.textContent = isDecimal
          ? obj.value.toFixed(1)
          : Math.floor(obj.value).toLocaleString();
      }
    },
  });
}

export function animateStaggerEntrance(selector: string, delay: number = 50) {
  const elements = document.querySelectorAll(selector);
  if (!elements || elements.length === 0) return;

  anime({
    targets: selector,
    opacity: [0, 1],
    translateY: [24, 0],
    scale: [0.97, 1],
    delay: anime.stagger(delay, { start: 100 }),
    easing: "easeOutCubic",
    duration: 650,
  });
}

export function animateGlowPulse(target: HTMLElement | string) {
  anime({
    targets: target,
    boxShadow: [
      "0 0 0 rgba(99, 102, 241, 0)",
      "0 0 25px rgba(99, 102, 241, 0.4)",
      "0 0 0 rgba(99, 102, 241, 0)",
    ],
    easing: "easeInOutSine",
    duration: 2400,
    loop: true,
  });
}
