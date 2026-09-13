"use client";

import { useEffect, useRef } from "react";

const MatrixBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "01010101010101010101ABCDEF0123456789";
        const fontSize = 13;
        const columnSpacing = 28;
        const columns = Math.floor(canvas.width / columnSpacing);

        const rainDrops: number[] = [];
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = Math.floor(Math.random() * -60);
        }

        const draw = () => {
            ctx.fillStyle = "rgba(3, 7, 18, 0.08)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "rgba(148, 163, 184, 0.35)";
            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                const text = chars.charAt(
                    Math.floor(Math.random() * chars.length)
                );
                ctx.fillText(text, i * columnSpacing, rainDrops[i] * fontSize);

                if (
                    rainDrops[i] * fontSize > canvas.height &&
                    Math.random() > 0.985
                ) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0, opacity: 0.035 }}
        />
    );
};

export default MatrixBackground;
