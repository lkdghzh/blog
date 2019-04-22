declare module namespace {

    export interface Scripts {
        test: string;
    }

    export interface RootObject {
        name: string;
        version: string;
        description: string;
        main: string;
        scripts: Scripts;
        author: string;
        license: string;
    }

}

