import {useTranslation as useTranslationT} from "./useAutocompleteT";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Earth, Languages} from "lucide-react";

/**
 * TODO: Display available JSON files
 * TODO: Display available languages
 * TODO: Add functionality to change language
 * TODO: Add functionality to change JSON file
 */
function ExampleApp() {
    const {T} = useTranslationT();
    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background p-6 w-full">
                <div className="p-2 flex flex-row items-center">
                    <Earth className="mr-4" />
                    <Languages className="mr-4"/>
                    <h1 className="text-2xl font-semibold">React Intl - Example</h1>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card className="mx-auto max-w-sm">
                        <CardHeader className="flex flex-col justify-between">
                            <CardTitle>Translations</CardTitle>
                            <CardDescription>
                                Example of translations using the <code className="text-secondary-foreground">useTranslation</code> hook
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Translation Type</TableHead>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Output</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Simple translation
                                        </TableCell>
                                        <TableCell>
                                            <code>T('hello')</code>
                                        </TableCell>
                                        <TableCell>
                                            {T('hello')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Translation with parameters
                                        </TableCell>
                                        <TableCell>
                                            <code>{`T('user.describe.simple', {name: "John"})`}</code>
                                        </TableCell>
                                        <TableCell>
                                            {T('user.describe.simple', {name: 'John'})}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Pluralization
                                        </TableCell>
                                        <TableCell>
                                            <code>{`T('message-count', {count: 5})`}</code>
                                        </TableCell>
                                        <TableCell>
                                            {T('message-count', {count: 5})}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Fallback
                                        </TableCell>
                                        <TableCell>
                                            <code>{`T('fallback.valid')`}</code>
                                        </TableCell>
                                        <TableCell>
                                            {T('fallback.valid')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Date
                                        </TableCell>
                                        <TableCell>
                                            <code>{`T('date')`}</code>
                                        </TableCell>
                                        <TableCell>
                                            {T('date')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Date UTC
                                        </TableCell>
                                        <TableCell>
                                            <code>{`T('date-utc')`}</code>
                                        </TableCell>
                                        <TableCell>
                                            {T('date-utc')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Nested Dates (Simple Format)
                                        </TableCell>
                                        <TableCell>
                                            <code>{`T('dates.simple')`}</code>
                                        </TableCell>
                                        <TableCell>
                                            {T('dates.simple')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Nested Dates (Complex Format)
                                        </TableCell>
                                        <TableCell>
                                            <code>{`T('dates.nested.complex')`}</code>
                                        </TableCell>
                                        <TableCell>
                                            {T('dates.nested.complex')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Parameters in Dates
                                        </TableCell>
                                        <TableCell>
                                            <code>{`T('dates.parameter', {date: new Date()})`}</code>
                                        </TableCell>
                                        <TableCell>
                                            {T('dates.parameter', {date: new Date().toDateString()})}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Missing key
                                        </TableCell>
                                        <TableCell>
                                            <code>{`T('missing.key')`}</code>
                                        </TableCell>
                                        <TableCell>
                                            {T('missing.key')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Missing key with fallback
                                        </TableCell>
                                        <TableCell>
                                            <code>{`T('fallback.valid')`}</code>
                                        </TableCell>
                                        <TableCell>
                                            {T('fallback.valid')}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export default ExampleApp
