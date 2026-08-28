import '@testing-library/jest-dom'

// Mock Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />
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

// Mock next-intl hooks for tests so components can call useTranslations
// without an explicit NextIntlClientProvider wrapper.
jest.mock('next-intl', () => {
    const translate = (key) => key
    return {
        __esModule: true,
        useTranslations: () => translate,
        useLocale: () => 'en',
        useMessages: () => ({}),
        useFormatter: () => ({
            formatTime: (d) => String(d),
            formatDate: (d) => String(d),
            formatNumber: (n) => String(n),
        }),
        NextIntlClientProvider: ({ children }) => children,
    }
})

// Mock next-intl/server (used by async server components in tests)
jest.mock('next-intl/server', () => {
    const translate = (key) => key
    const t = (key) => key
    return {
        __esModule: true,
        getTranslations: jest.fn().mockImplementation(async () => t),
        getMessages: jest.fn().mockResolvedValue({}),
        getFormatter: jest.fn().mockResolvedValue({
            formatTime: (d) => String(d),
            formatDate: (d) => String(d),
            formatNumber: (n) => String(n),
        }),
        getNow: jest.fn().mockResolvedValue(new Date()),
        getTimeZone: jest.fn().mockResolvedValue('UTC'),
        getLocale: jest.fn().mockResolvedValue('en'),
        unstable_setRequestLocale: jest.fn(),
    }
})

// Mock the i18n routing module
jest.mock('@/i18n/routing', () => {
    const actual = jest.requireActual('next-intl/navigation')
    return {
        __esModule: true,
        Link: ({ children, href, ...rest }) => (
            <a href={href} {...rest}>
                {children}
            </a>
        ),
        useRouter: () => ({
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
        }),
        usePathname: () => '/',
        redirect: jest.fn(),
        getPathname: actual.getPathname,
        routing: {
            locales: ['en', 'pt-BR'],
            defaultLocale: 'en',
            localePrefix: 'always',
        },
    }
})

// Mock IntersectionObserver for react-intersection-observer
global.IntersectionObserver = class IntersectionObserver {
    constructor() { }
    disconnect() { }
    observe() { }
    unobserve() { }
}
