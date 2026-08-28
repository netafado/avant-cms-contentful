import '@testing-library/jest-dom'

// Mock Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority, fill, ...props }) => {
        // next/image translates `priority` into `fetchpriority="high"` on
        // the rendered <img>. Mirror that here so tests can assert it.
        const imgProps = priority
            ? { ...props, fetchpriority: 'high' }
            : props;
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...imgProps} />
    },
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
        }
    },
    useSearchParams() {
        return new URLSearchParams()
    },
    usePathname() {
        return ''
    },
}))

// Mock IntersectionObserver for react-intersection-observer
global.IntersectionObserver = class IntersectionObserver {
    constructor() { }
    disconnect() { }
    observe() { }
    unobserve() { }
}
