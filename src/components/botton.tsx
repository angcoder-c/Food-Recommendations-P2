/**
 * A customizable button component that navigates to a specified route using Next.js router.
 *
 * @param to - The path to navigate to when the button is clicked.
 * @param backgroundColor - Optional background color for the button. Defaults to '#0070f3'.
 * @param textColor - Optional text color for the button. Defaults to '#fff'.
 * @param size - Optional size for the button. Can be 'small', 'medium', or 'large'. Defaults to 'medium'.
 * @param children - The content to display inside the button.
 * @param className - Optional additional CSS class names for styling.
 *
 * @example
 * ```tsx
 * <Button to="/about" backgroundColor="#ff6347" textColor="#fff" size="large">
 *   Go to About Page
 * </Button>
 * ```
 *
 * This will render a button that navigates to the "/about" route when clicked, with a custom background, text color, and size.
 */

import React from 'react';
import { useRouter } from 'next/navigation';

interface ButtonProps {
    to: string;
    backgroundColor?: string;
    textColor?: string;
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
    className?: string;
}

const sizeStyles = {
    small: {
        padding: '0.5em 1em',
        fontSize: '0.875rem',
    },
    medium: {
        padding: '0.75em 1.5em',
        fontSize: '1rem',
    },
    large: {
        padding: '1em 2em',
        fontSize: '1.25rem',
    },
};

const Button: React.FC<ButtonProps> = ({
    to,
    backgroundColor = '#0070f3',
    textColor = '#fff',
    size = 'medium',
    children,
    className = '',
}) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push(to);
    };

    return (
        <button
            onClick={handleClick}
            style={{
                backgroundColor,
                color: textColor,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                ...sizeStyles[size],
            }}
            className={className}
        >
            {children}
        </button>
    );
};

export default Button;