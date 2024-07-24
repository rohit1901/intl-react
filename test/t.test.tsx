// Import Vitest functions and any necessary utilities
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {IntlReact, IntlReactContext, useTranslation} from '../src/t.tsx';

// Use Vitest's mock function
vi.mock('./src/initLocale.ts', () => ({
    initLocale: vi.fn().mockReturnValue('en'),
}));

describe('IntlReact Component', () => {
    it('renders without crashing', () => {
        render(<IntlReact languages={{ en: 'English' }} defaultLanguage="en" />);
        // Assertions can be added here if needed
    });
});

describe('useTranslation Hook', () => {
    const MockComponent = () => {
        const { T } = useTranslation();
        return <div>{T('testKey')}</div>;
    };

    it('returns correct translation function and context values', () => {
        render(
            <IntlReactContext.Provider value={{ locale: 'en', setLocale: vi.fn(), languages: { en: { testKey: 'Test Value' } }, defaultLanguage: 'en' }}>
                <MockComponent />
            </IntlReactContext.Provider>
        );
        expect(screen.getByText('Test Value')).toBeInTheDocument();
    });
});