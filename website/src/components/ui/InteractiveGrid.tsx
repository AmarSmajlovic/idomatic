"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function InteractiveGrid() {
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const noiseRef = useRef<Map<string, number>>(new Map());

    const gridSize = 50;
    const glowRadius = 4;

    // Generate consistent noise for each cell
    const getNoise = (col: number, row: number) => {
        const key = `${col}-${row}`;
        if (!noiseRef.current.has(key)) {
            noiseRef.current.set(key, Math.random());
        }
        return noiseRef.current.get(key)!;
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setMousePos(null);
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    const getGlowingCells = () => {
        if (!mousePos) return [];

        const centerCol = Math.floor(mousePos.x / gridSize);
        const centerRow = Math.floor(mousePos.y / gridSize);

        const cells = [];

        for (let dr = -glowRadius; dr <= glowRadius; dr++) {
            for (let dc = -glowRadius; dc <= glowRadius; dc++) {
                const col = centerCol + dc;
                const row = centerRow + dr;
                const distance = Math.sqrt(dc * dc + dr * dr);

                if (distance <= glowRadius) {
                    const noise = getNoise(col, row);

                    // Random threshold - some cells won't show at all
                    if (noise > 0.35) {
                        // Base opacity + noise variation
                        const baseOpacity = 0.035 * (1 - distance / glowRadius);
                        const opacity = baseOpacity * (0.5 + noise * 0.8);

                        if (opacity > 0.008) {
                            cells.push({ col, row, opacity });
                        }
                    }
                }
            }
        }

        return cells;
    };

    const glowingCells = getGlowingCells();

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >
            {/* Grid lines */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(63, 63, 70, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(63, 63, 70, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                }}
            />

            {/* Random shaped glow around cursor */}
            {glowingCells.map((cell) => (
                <div
                    key={`${cell.col}-${cell.row}`}
                    className="absolute"
                    style={{
                        left: cell.col * gridSize,
                        top: cell.row * gridSize,
                        width: gridSize,
                        height: gridSize,
                        transition: 'opacity 250ms ease-out',
                        opacity: cell.opacity,
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                    }}
                />
            ))}
        </div>
    );
}
