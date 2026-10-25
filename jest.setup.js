import '@testing-library/jest-dom'

// Mock Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img alt="" {...props} />
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
// without an explicit NextIntlClientProvider wrapper. Keys resolve against the
// real English messages so tests can assert on actual copy.
jest.mock('next-intl', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const messages = require('./messages/en.json')
    const resolve = (namespace, key) => {
        const path = namespace ? `${namespace}.${key}` : key
        const value = path
            .split('.')
            .reduce((node, part) => (node == null ? node : node[part]), messages)
        return typeof value === 'string' ? value : key
    }
    const translate = (namespace) => (key) => resolve(namespace, key)
    return {
        __esModule: true,
        useTranslations: translate,
        useLocale: () => 'en',
        useMessages: () => messages,
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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const messages = require('./messages/en.json')
    const resolve = (namespace, key) => {
        const path = namespace ? `${namespace}.${key}` : key
        const value = path
            .split('.')
            .reduce((node, part) => (node == null ? node : node[part]), messages)
        return typeof value === 'string' ? value : key
    }
    return {
        __esModule: true,
        getTranslations: jest.fn().mockImplementation(async (namespace) =>
            typeof namespace === 'object' && namespace !== null
                ? (key) => resolve(namespace.namespace, key)
                : (key) => resolve(namespace, key)
        ),
        getMessages: jest.fn().mockResolvedValue(messages),
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

// Mock the i18n routing module. next-intl/navigation is ESM-only, so the
// real module can't be required here; getPathname is stubbed instead.
jest.mock('@/i18n/routing', () => {
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
        getPathname: ({ href }) => (typeof href === 'string' ? href : href?.pathname ?? '/'),
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

// jsdom does not implement matchMedia (used by the SunHero canvas)
global.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
}))
