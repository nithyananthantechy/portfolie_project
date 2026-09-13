"use client";

import { useEffect, useRef } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    baseAlpha: number;
    color: string;
}

export default function InteractiveCyberCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        };

        window.addEventListener("resize", handleResize);

        // Mouse position for subtle interaction
        const mouse = {
            x: -1000,
            y: -1000,
            radius: 120,
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

        // Node creation: mix of cyan (#00f5c4) and imperial gold (#f5a623)
        let nodes: Node[] = [];
        const nodeCount = Math.min(Math.floor((width * height) / 28000), 55);

        const colors = [
            "rgba(255, 255, 255, ",   // Pure White Constellation
            "rgba(148, 163, 184, ",  // Titanium Slate
            "rgba(56, 189, 248, ",   // Executive Sky-Blue
        ];

        const initNodes = () => {
            nodes = [];
            for (let i = 0; i < nodeCount; i++) {
                const colorPrefix = colors[i % colors.length];
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    radius: Math.random() * 1.5 + 0.8,
                    baseAlpha: Math.random() * 0.25 + 0.1,
                    color: colorPrefix,
                });
            }
        };

        initNodes();

        // Render loop
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Connect nearby nodes
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        const alpha = (1 - dist / 120) * 0.08;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Update and draw nodes
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                // Cursor influence (gentle, smooth repulsion so it never jars the viewer)
                const dx = node.x - mouse.x;
                const dy = node.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius && dist > 0) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    node.x += Math.cos(angle) * force * 1.5;
                    node.y += Math.sin(angle) * force * 1.5;
                }

                // Normal velocity
                node.x += node.vx;
                node.y += node.vy;

                // Bounce borders smoothly
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${node.color}${node.baseAlpha})`;
                ctx.fill();

                // Subtle halo for select nodes
                if (i % 3 === 0) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = `${node.color}${node.baseAlpha * 0.25})`;
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-[1] opacity-75 transition-opacity duration-1000"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
