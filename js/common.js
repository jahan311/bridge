function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setVh();
window.addEventListener("resize", setVh);

function isAnySectionPinned() {
    return ScrollTrigger.getAll().some(t => t.pin && t.isActive);
}

// main
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main",
            start: "top top",
            end: window.innerWidth <= 768 ? "+=260%" : "+=500%",
            scrub: 1,
            pin: true
        }
    });
    tl.to([".intro_video h2", ".intro_video .scroll"], {
        y: -60,
        opacity: 0,
        duration: 1.4,
        ease: "power1.out"
    });

    tl.to(".intro_video .video_inner", {
        scale: 0.7,
        borderRadius: "3.2rem",
        duration: 1.8,
        ease: "power2.out"
    }, "-=0.2");

    tl.to(".intro_text", {
        opacity: 1,
        duration: 3.0,
        ease: "power2.out",
    });

    tl.to(".intro_text h3", {
        opacity: 1,
        y: 0,
        duration: 3.0,
        stagger: 1.5,
        ease: "power2.out",
        onStart: () => {
            document.querySelector(".floating").classList.remove("hidden");
        }
    });

    tl.to(".main .fade_bg", {
        opacity: 1,
        duration: 4,
        ease: "power2.inOut"
    });
});

// sc01
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const boxes = gsap.utils.toArray(".sc01 .txt");
    const total = boxes.length;

    const isMobile = window.innerWidth <= 768;

    const gap = isMobile ? 100 : 160;
    const endValue = isMobile ? "+=80%" : "+=180%";

    boxes.forEach((box, i) => {
        gsap.set(box, {
            opacity: 0,
            y: gap * i + 200
        });
    });

    ScrollTrigger.create({
        trigger: ".sc01",
        start: "top top",
        end: endValue,
        scrub: 1,
        pin: true,
        onUpdate(self) {
            const p = self.progress;
            const moveY = p * (gap * (total + 4));

            boxes.forEach((box, i) => {
                const targetY = (gap * i) - moveY + 200;

                const rect = box.getBoundingClientRect();
                const center = window.innerHeight / 2;
                const dist = Math.abs((rect.top + rect.height / 2) - center);

                let opacity = 1 - dist / (window.innerHeight * 0.4);
                opacity = Math.max(0, Math.min(1, opacity));

                let scale = 1 - dist / (window.innerHeight * 0.9);
                scale = Math.max(0.6, Math.min(1, scale));

                let z = -300 * (dist / window.innerHeight);

                gsap.set(box, {
                    y: targetY,
                    opacity,
                    scale,
                    z
                });
            });
        }
    });
});


// sc02
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const nums = document.querySelectorAll(".sc02 .num");
    const bg = document.querySelector(".sc02 .bg");
    const BG_DURATION = 1.5;
    const COUNT_DURATION = 1;

    const isMobile = window.innerWidth <= 768;

    nums.forEach(num => {
        const target = num.textContent.replace(/[^0-9]/g, "");
        num.dataset.target = target;

        const firstTextNode = [...num.childNodes].find(n => n.nodeType === 3);
        num._numberNode = firstTextNode;
    });

    function resetSc02() {
        gsap.set(bg, {
            height: "0%"
        });

        nums.forEach(num => {
            if (num._numberNode) {
                num._numberNode.nodeValue = "0";
            }
        });
    }

    resetSc02();

    ScrollTrigger.create({
        trigger: ".sc02",
        start: "top top",
        end: window.innerWidth <= 768 ? "+=80%" : "+=150%",
        pin: true,
        scrub: 1,
        onEnter: playSc02,
        onEnterBack: playSc02,
        onLeaveBack: resetSc02
    });

    function playSc02() {
        gsap.to(bg, {
            height: "100%",
            duration: BG_DURATION,
            ease: "power2.out"
        });

        nums.forEach(num => {
            const target = parseInt(num.dataset.target);
            let obj = {
                val: 0
            };

            gsap.to(obj, {
                val: target,
                duration: COUNT_DURATION,
                ease: "power3.out",
                onUpdate() {
                    if (num._numberNode) {
                        num._numberNode.nodeValue =
                            Math.floor(obj.val).toLocaleString();
                    }
                }
            });
        });
    }

    ScrollTrigger.create({
        trigger: ".sc03",
        start: isMobile ? "top 50%" : "top 40%",
        onEnter: resetSc02
    });

    ScrollTrigger.create({
        trigger: ".sc02",
        start: "top top",
        onEnter: resetSc02
    });
});


// sc03
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const sc03 = document.querySelector(".sc03");
    const txt = sc03.querySelector(".sc_txt");
    const swiper = sc03.querySelector(".logo_swiper");

    gsap.set([txt, swiper], {
        opacity: 0,
        y: 40
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc03",
            start: "top top",
            end: window.innerWidth <= 768 ? "+=120%" : "+=200%",
            pin: true,
            scrub: 1,
            onLeave: () => resetSc03(),
            onLeaveBack: () => resetSc03(),
            onEnter: () => playSc03(),
            onEnterBack: () => playSc03()
        }
    });

    tl.to(".sc03 .fade_bg", {
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut"
    });

    function playSc03() {
        gsap.to([txt, swiper], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.6,
            ease: "power3.out"
        });
    }

    function resetSc03() {
        gsap.set([txt, swiper], {
            opacity: 0,
            y: 40
        });
    }
});


// sc04
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({

        "(min-width: 769px)": function () {

            const section = document.querySelector(".sc04");
            const txt = section.querySelector(".sc_txt");
            const cards = gsap.utils.toArray(".sc04 .card");

            const cardHeight = 600;
            const gap = 40;
            const totalMove = (cardHeight + gap) * cards.length + 150;
            const extra = 900;

            gsap.set(txt, {
                opacity: 0,
                y: 30
            });
            gsap.set(".sc04 .card_box", {
                opacity: 0
            });
            gsap.set(cards, {
                y: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".sc04",
                    start: "top top",
                    end: "+=" + (totalMove + extra),
                    scrub: 1,
                    pin: true,
                }
            });

            tl.to(txt, {
                opacity: 1,
                y: 0,
                duration: 0.6
            });
            tl.to(".sc04 .card_box", {
                opacity: 1,
                duration: 1
            }, "+=0.6");

            tl.to(cards, {
                y: -(totalMove),
                ease: "none",
                duration: 12
            }, "+=1.2");

            tl.to(txt, {
                opacity: 0,
                y: -30,
                duration: 1
            }, "+=0.6");

            tl.to(".sc04 .fade_bg", {
                opacity: 1,
                backgroundColor: "#0e0e0e",
                duration: 3,
                ease: "power2.inOut"
            });
        },

        "(max-width: 768px)": function () {

            const section = document.querySelector(".sc04");
            const txt = section.querySelector(".sc_txt");
            const cards = gsap.utils.toArray(".sc04 .card");

            const cardHeight = 600;
            const gap = 40;
            const totalMove = (cardHeight + gap) * cards.length;
            const extra = 0;

            gsap.set(txt, {
                opacity: 0,
                y: 30
            });
            gsap.set(".sc04 .card_box", {
                opacity: 0
            });
            gsap.set(cards, {
                y: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".sc04",
                    start: "top top",
                    end: "+=" + (totalMove * 0.35),
                    scrub: 1,
                    pin: true,
                }
            });

            tl.to(txt, {
                opacity: 1,
                y: 0,
                duration: 0.6
            });

            tl.to(".sc04 .card_box", {
                opacity: 1,
                duration: 1
            }, "+=0.6");

            tl.to(cards, {
                y: -(totalMove),
                ease: "none",
                duration: 12,
            }, "+=1.2");

            tl.to(txt, {
                y: -(totalMove * 0.6),
                ease: "none",
                duration: 12,
            }, "<");

            tl.to(".wrap", {
                backgroundColor: "#0e0e0e",
                duration: 1.2,
                ease: "none"
            }, "<");

            tl.to(".sc04 .fade_bg", {
                opacity: 1,
                duration: 1.2,
                backgroundColor: "#0e0e0e",
                ease: "power2.out"
            });

            tl.to(".sc04", {
                backgroundColor: "#0e0e0e",
                duration: 1.2,
                ease: "none"
            }, "<");
        }


    });
});


// sc05
document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);


    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {

            const section = document.querySelector(".sc05");
            const txt = section.querySelector(".sc_txt");
            const cards = gsap.utils.toArray(".sc05 .card");

            const cardHeight = 600;
            const gap = 40;
            const totalMove = (cardHeight + gap) * cards.length + 150;
            const extra = 900;

            gsap.set(txt, {
                opacity: 0,
                y: 30
            });
            gsap.set(".sc05 .card_box", {
                opacity: 0
            });
            gsap.set(cards, {
                y: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".sc05",
                    start: "top top",
                    end: "+=" + (totalMove + extra),
                    scrub: 1,
                    pin: true,
                }
            });

            tl.to(txt, {
                opacity: 1,
                y: 0,
                duration: 0.6
            });

            tl.to(".sc05 .card_box", {
                opacity: 1,
                duration: 1
            }, "+=0.6");

            tl.to(cards, {
                y: -(totalMove),
                ease: "none",
                duration: 12,
            }, "+=1.2");

            tl.to(txt, {
                opacity: 0,
                y: -30,
                duration: 1,
            }, "+=0.6");

            tl.to(".sc05 .fade_bg", {
                opacity: 1,
                duration: 1.5,
                ease: "power2.inOut"
            });
        },

        "(max-width: 768px)": function () {
            const section = document.querySelector(".sc05");
            const txt = section.querySelector(".sc_txt");
            const cards = gsap.utils.toArray(".sc05 .card");

            const cardHeight = 600;
            const gap = 40;
            const totalMove = (cardHeight + gap) * cards.length;

            gsap.set(txt, {
                opacity: 0,
                y: 30
            });
            gsap.set(".sc05 .card_box", {
                opacity: 0
            });
            gsap.set(cards, {
                y: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".sc05",
                    start: "top top",
                    end: "+=" + (totalMove * 0.35),
                    scrub: 1,
                    pin: true,
                }
            });

            tl.to(".wrap", {
                backgroundColor: "transparent",
                duration: 0.1
            });

            tl.to(txt, {
                opacity: 1,
                y: 0,
                duration: 0.6
            });

            tl.to(".sc05 .card_box", {
                opacity: 1,
                duration: 1
            }, "+=0.6");

            tl.to(cards, {
                y: -(totalMove),
                ease: "none",
                duration: 12,
            }, "+=1.2");

            tl.to(txt, {
                y: -(totalMove * 0.6),
                ease: "none",
                duration: 12,
            }, "<");

            tl.to(".sc05 .fade_bg", {
                opacity: 1,
                backgroundColor: "#0e0e0e",
                duration: 1,
                ease: "power2.inOut"
            });
        }

    });
});


// sc06
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc06",
            start: "top top",
            end: window.innerWidth <= 768 ? "+=260%" : "+=400%",
            scrub: 1,
            pin: true
        }
    });

    tl.fromTo(".sc06 .logo", {
            opacity: 0,
            y: 60
        }, {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power2.out"
        },
        "+=0.6"
    );

    tl.to(".sc06 .logo", {
        opacity: 0,
        y: -60,
        duration: 1.2,
        ease: "power2.inOut"
    });

    tl.fromTo(".sc06 .text_container .txt", {
            opacity: 0,
            y: 60
        }, {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power2.out"
        },
        "+=0.6"
    );

    tl.to(".sc06 .text_container .txt", {
        opacity: 0,
        y: -60,
        duration: 1.2,
        ease: "power2.inOut"
    });

    tl.fromTo(".sc06 .contact_container", {
        opacity: 0,
        y: 40
    }, {
        opacity: 1,
        y: 0,
        duration: 1.6,
        ease: "power2.out"
    });
});

// floating
window.addEventListener("load", () => {
    window.scrollTo(0, 0);

    const floating = document.querySelector(".floating");
    const progressBar = document.querySelector(".floating .progress");
    const closeBtn = document.querySelector(".floating .close_btn");
    const moBtn = document.querySelector(".floating .mo_floating_btn");

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: ".intro_text h3",
        start: "top top",
        onLeaveBack: () => floating.classList.add("hidden"),
    });

    const sc06Trigger = ScrollTrigger.create({
        trigger: ".sc06",
        start: "top top"
    });

    ScrollTrigger.create({
        trigger: ".sc06",
        start: "top bottom",
        onEnter: () => floating.classList.add("hidden"),
        onEnterBack: () => floating.classList.add("hidden"),
        onLeaveBack: () => floating.classList.remove("hidden")
    });

    closeBtn.addEventListener("click", () => {
        floating.classList.toggle("close");
    });

    if (window.innerWidth <= 768) {
        if (moBtn) {

            moBtn.addEventListener("click", () => {
                const modal = document.querySelector(".modal");

                modal.classList.add("show");

                document.body.style.overflow = "hidden";
            });

            const modalCloseBtn = document.querySelector(".modal_close_btn");
            modalCloseBtn.addEventListener("click", () => {
                const modal = document.querySelector(".modal");

                modal.classList.remove("show");

                document.body.style.overflow = "";
            });
        }
    }

    function updateProgressScroll() {
        if (window.innerWidth <= 768) return;

        let sc06Top = sc06Trigger.start;
        let maxScroll = sc06Top - window.innerHeight;
        let scrollTop = window.scrollY;

        let progress = (scrollTop / maxScroll) * 100;

        if (progress < 0) progress = 0;
        if (progress > 100) progress = 100;

        progressBar.style.width = progress + "%";
    }

    if (window.innerWidth > 768) {
        window.addEventListener("scroll", updateProgressScroll);

        ScrollTrigger.addEventListener("refresh", () => {
            updateProgressScroll();
        });

        ScrollTrigger.refresh();
    }
});