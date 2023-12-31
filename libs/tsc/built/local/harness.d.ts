/// <reference types="node" />
/// <reference types="node" />
declare namespace collections {
    interface SortOptions<T> {
        comparer: (a: T, b: T) => number;
        sort: "insertion" | "comparison";
    }
    class SortedMap<K, V> {
        private _comparer;
        private _keys;
        private _values;
        private _order;
        private _version;
        private _copyOnWrite;
        constructor(comparer: ((a: K, b: K) => number) | SortOptions<K>, iterable?: Iterable<[K, V]>);
        get size(): number;
        get comparer(): (a: K, b: K) => number;
        get [Symbol.toStringTag](): string;
        has(key: K): boolean;
        get(key: K): V | undefined;
        getEntry(key: K): [K, V] | undefined;
        set(key: K, value: V): this;
        delete(key: K): boolean;
        clear(): void;
        forEach(callback: (value: V, key: K, collection: this) => void, thisArg?: any): void;
        keys(): Generator<K, void, undefined>;
        values(): Generator<V, void, undefined>;
        entries(): Generator<[K, V], void, unknown>;
        [Symbol.iterator](): Generator<[K, V], void, unknown>;
        private writePreamble;
        private writePostScript;
        private getIterationOrder;
    }
    function insertAt<T>(array: T[], index: number, value: T): void;
    function getIterator<T>(iterable: Iterable<T>): Iterator<T>;
    function nextResult<T>(iterator: Iterator<T>): IteratorResult<T> | undefined;
    function closeIterator<T>(iterator: Iterator<T>): void;
    /**
     * A collection of metadata that supports inheritance.
     */
    class Metadata {
        private static readonly _undefinedValue;
        private _parent;
        private _map;
        private _version;
        private _size;
        private _parentVersion;
        constructor(parent?: Metadata);
        get size(): number;
        get parent(): Metadata | undefined;
        has(key: string): boolean;
        get(key: string): any;
        set(key: string, value: any): this;
        delete(key: string): boolean;
        clear(): void;
        forEach(callback: (value: any, key: string, map: this) => void): void;
        private static _escapeKey;
        private static _unescapeKey;
    }
}
/**
 * Common utilities
 */
declare namespace Utils {
    function removeTestPathPrefixes(text: string, retainTrailingDirectorySeparator?: boolean): string;
    function sanitizeTraceResolutionLogEntry(text: string): string;
    /**
     * Removes leading indentation from a template literal string.
     */
    function dedent(array: TemplateStringsArray, ...args: any[]): string;
    function getByteOrderMarkLength(text: string): number;
    function removeByteOrderMark(text: string): string;
    function addUTF8ByteOrderMark(text: string): string;
    function theory<T extends any[]>(name: string, cb: (...args: T) => void, data: T[]): void;
    interface Deferred<T> {
        resolve: (value: T | PromiseLike<T>) => void;
        reject: (reason: unknown) => void;
        promise: Promise<T>;
    }
    function defer<T = void>(): Deferred<T>;
}
declare namespace documents {
    class TextDocument {
        readonly meta: Map<string, string>;
        readonly file: string;
        readonly text: string;
        private _lineStarts;
        private _testFile;
        constructor(file: string, text: string, meta?: Map<string, string>);
        get lineStarts(): readonly number[];
        static fromTestFile(file: Harness.Compiler.TestFile): TextDocument;
        asTestFile(): Harness.Compiler.TestFile;
    }
    interface RawSourceMap {
        version: number;
        file: string;
        sourceRoot?: string;
        sources: string[];
        sourcesContent?: string[];
        names: string[];
        mappings: string;
    }
    interface Mapping {
        mappingIndex: number;
        emittedLine: number;
        emittedColumn: number;
        sourceIndex: number;
        sourceLine: number;
        sourceColumn: number;
        nameIndex?: number;
    }
    class SourceMap {
        readonly raw: RawSourceMap;
        readonly mapFile: string | undefined;
        readonly version: number;
        readonly file: string;
        readonly sourceRoot: string | undefined;
        readonly sources: readonly string[];
        readonly sourcesContent: readonly string[] | undefined;
        readonly mappings: readonly Mapping[];
        readonly names: readonly string[] | undefined;
        private static readonly _mappingRegExp;
        private static readonly _sourceMappingURLRegExp;
        private static readonly _dataURLRegExp;
        private static readonly _base64Chars;
        private _emittedLineMappings;
        private _sourceLineMappings;
        constructor(mapFile: string | undefined, data: string | RawSourceMap);
        static getUrl(text: string): string | undefined;
        static fromUrl(url: string): SourceMap | undefined;
        static fromSource(text: string): SourceMap | undefined;
        getMappingsForEmittedLine(emittedLine: number): readonly Mapping[] | undefined;
        getMappingsForSourceLine(sourceIndex: number, sourceLine: number): readonly Mapping[] | undefined;
        private static _decodeVLQ;
    }
}
declare namespace vpath {
    export import sep = ts.directorySeparator;
    export import normalizeSeparators = ts.normalizeSlashes;
    export import isAbsolute = ts.isRootedDiskPath;
    export import isRoot = ts.isDiskPathRoot;
    export import hasTrailingSeparator = ts.hasTrailingDirectorySeparator;
    export import addTrailingSeparator = ts.ensureTrailingDirectorySeparator;
    export import removeTrailingSeparator = ts.removeTrailingDirectorySeparator;
    export import normalize = ts.normalizePath;
    export import combine = ts.combinePaths;
    export import parse = ts.getPathComponents;
    export import reduce = ts.reducePathComponents;
    export import format = ts.getPathFromPathComponents;
    export import resolve = ts.resolvePath;
    export import compare = ts.comparePaths;
    export import compareCaseSensitive = ts.comparePathsCaseSensitive;
    export import compareCaseInsensitive = ts.comparePathsCaseInsensitive;
    export import dirname = ts.getDirectoryPath;
    export import basename = ts.getBaseFileName;
    export import extname = ts.getAnyExtensionFromPath;
    export import relative = ts.getRelativePathFromDirectory;
    export import beneath = ts.containsPath;
    export import changeExtension = ts.changeAnyExtension;
    export import isTypeScript = ts.hasTSFileExtension;
    export import isJavaScript = ts.hasJSFileExtension;
    const enum ValidationFlags {
        None = 0,
        RequireRoot = 1,
        RequireDirname = 2,
        RequireBasename = 4,
        RequireExtname = 8,
        RequireTrailingSeparator = 16,
        AllowRoot = 32,
        AllowDirname = 64,
        AllowBasename = 128,
        AllowExtname = 256,
        AllowTrailingSeparator = 512,
        AllowNavigation = 1024,
        AllowWildcard = 2048,
        /** Path must be a valid directory root */
        Root = 545,
        /** Path must be a absolute */
        Absolute = 2017,
        /** Path may be relative or absolute */
        RelativeOrAbsolute = 2016,
        /** Path may only be a filename */
        Basename = 260
    }
    function validate(path: string, flags?: ValidationFlags): string;
    function isDeclaration(path: string): boolean;
    function isSourceMap(path: string): boolean;
    function isJavaScriptSourceMap(path: string): boolean;
    function isJson(path: string): boolean;
    function isDefaultLibrary(path: string): boolean;
    function isTsConfigFile(path: string): boolean;
}
declare namespace vfs {
    /**
     * Posix-style path to the TypeScript compiler build outputs (including tsc.js, lib.d.ts, etc.)
     */
    const builtFolder = "/.ts";
    /**
     * Posix-style path to additional mountable folders (./tests/projects in this repo)
     */
    const projectsFolder = "/.projects";
    /**
     * Posix-style path to additional test libraries
     */
    const testLibFolder = "/.lib";
    /**
     * Posix-style path to sources under test
     */
    const srcFolder = "/.src";
    interface DiffOptions {
        includeChangedFileWithSameContent?: boolean;
        baseIsNotShadowRoot?: boolean;
    }
    /**
     * Represents a virtual POSIX-like file system.
     */
    class FileSystem {
        /** Indicates whether the file system is case-sensitive (`false`) or case-insensitive (`true`). */
        readonly ignoreCase: boolean;
        /** Gets the comparison function used to compare two paths. */
        readonly stringComparer: (a: string, b: string) => number;
        private _lazy;
        private _cwd;
        private _time;
        private _shadowRoot;
        private _dirStack;
        constructor(ignoreCase: boolean, options?: FileSystemOptions);
        /**
         * Gets metadata for this `FileSystem`.
         */
        get meta(): collections.Metadata;
        /**
         * Gets a value indicating whether the file system is read-only.
         */
        get isReadonly(): boolean;
        /**
         * Makes the file system read-only.
         */
        makeReadonly(): this;
        /**
         * Gets the file system shadowed by this file system.
         */
        get shadowRoot(): FileSystem | undefined;
        /**
         * Snapshots the current file system, effectively shadowing itself. This is useful for
         * generating file system patches using `.diff()` from one snapshot to the next. Performs
         * no action if this file system is read-only.
         */
        snapshot(): void;
        /**
         * Gets a shadow copy of this file system. Changes to the shadow copy do not affect the
         * original, allowing multiple copies of the same core file system without multiple copies
         * of the same data.
         */
        shadow(ignoreCase?: boolean): FileSystem;
        /**
         * Gets or sets the timestamp (in milliseconds) used for file status, returning the previous timestamp.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/time.html
         */
        time(value?: number): number;
        /**
         * Gets the metadata object for a path.
         * @param path
         */
        filemeta(path: string): collections.Metadata;
        private _filemeta;
        /**
         * Get the pathname of the current working directory.
         *
         * @link - http://pubs.opengroup.org/onlinepubs/9699919799/functions/getcwd.html
         */
        cwd(): string;
        /**
         * Changes the current working directory.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chdir.html
         */
        chdir(path: string): void;
        /**
         * Pushes the current directory onto the directory stack and changes the current working directory to the supplied path.
         */
        pushd(path?: string): void;
        /**
         * Pops the previous directory from the location stack and changes the current directory to that directory.
         */
        popd(): void;
        /**
         * Update the file system with a set of files.
         */
        apply(files: FileSet): void;
        /**
         * Scan file system entries along a path. If `path` is a symbolic link, it is dereferenced.
         * @param path The path at which to start the scan.
         * @param axis The axis along which to traverse.
         * @param traversal The traversal scheme to use.
         */
        scanSync(path: string, axis: Axis, traversal: Traversal): string[];
        /**
         * Scan file system entries along a path.
         * @param path The path at which to start the scan.
         * @param axis The axis along which to traverse.
         * @param traversal The traversal scheme to use.
         */
        lscanSync(path: string, axis: Axis, traversal: Traversal): string[];
        private _scan;
        /**
         * Mounts a physical or virtual file system at a location in this virtual file system.
         *
         * @param source The path in the physical (or other virtual) file system.
         * @param target The path in this virtual file system.
         * @param resolver An object used to resolve files in `source`.
         */
        mountSync(source: string, target: string, resolver: FileSystemResolver): void;
        /**
         * Recursively remove all files and directories underneath the provided path.
         */
        rimrafSync(path: string): void;
        /**
         * Make a directory and all of its parent paths (if they don't exist).
         */
        mkdirpSync(path: string): void;
        getFileListing(): string;
        /**
         * Print diagnostic information about the structure of the file system to the console.
         */
        debugPrint(): void;
        /**
         * Determines whether a path exists.
         */
        existsSync(path: string): boolean;
        /**
         * Get file status. If `path` is a symbolic link, it is dereferenced.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        statSync(path: string): Stats;
        /**
         * Change file access times
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        utimesSync(path: string, atime: Date, mtime: Date): void;
        /**
         * Get file status. If `path` is a symbolic link, it is dereferenced.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lstat.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        lstatSync(path: string): Stats;
        private _stat;
        /**
         * Read a directory. If `path` is a symbolic link, it is dereferenced.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readdir.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        readdirSync(path: string): string[];
        /**
         * Make a directory.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdir.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        mkdirSync(path: string): void;
        private _mkdir;
        /**
         * Remove a directory.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rmdir.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        rmdirSync(path: string): void;
        /**
         * Link one file to another file (also known as a "hard link").
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/link.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        linkSync(oldpath: string, newpath: string): void;
        /**
         * Remove a directory entry.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/unlink.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        unlinkSync(path: string): void;
        /**
         * Rename a file.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        renameSync(oldpath: string, newpath: string): void;
        /**
         * Make a symbolic link.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/symlink.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        symlinkSync(target: string, linkpath: string): void;
        /**
         * Resolve a pathname.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/realpath.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        realpathSync(path: string): string;
        /**
         * Read from a file.
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        readFileSync(path: string, encoding?: null): Buffer;
        /**
         * Read from a file.
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        readFileSync(path: string, encoding: BufferEncoding): string;
        /**
         * Read from a file.
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        readFileSync(path: string, encoding?: BufferEncoding | null): string | Buffer;
        /**
         * Write to a file.
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        writeFileSync(path: string, data: string | Buffer, encoding?: string | null): void;
        /**
         * Generates a `FileSet` patch containing all the entries in this `FileSystem` that are not in `base`.
         * @param base The base file system. If not provided, this file system's `shadowRoot` is used (if present).
         */
        diff(base?: FileSystem | undefined, options?: DiffOptions): FileSet | undefined;
        /**
         * Generates a `FileSet` patch containing all the entries in `changed` that are not in `base`.
         */
        static diff(changed: FileSystem, base: FileSystem, options?: DiffOptions): FileSet | undefined;
        private static diffWorker;
        private static rootDiff;
        private static directoryDiff;
        private static fileDiff;
        private static symlinkDiff;
        private static trackCreatedInode;
        private static trackCreatedInodes;
        private static trackDeletedInodes;
        private _mknod;
        private _addLink;
        private _removeLink;
        private _replaceLink;
        private _getRootLinks;
        private _getLinks;
        private _getShadow;
        private _copyShadowLinks;
        private _getSize;
        private _getBuffer;
        /**
         * Walk a path to its end.
         *
         * @param path The path to follow.
         * @param noFollow A value indicating whether to *not* dereference a symbolic link at the
         * end of a path.
         *
         * @link http://man7.org/linux/man-pages/man7/path_resolution.7.html
         */
        private _walk;
        /**
         * Resolve a path relative to the current working directory.
         */
        private _resolve;
        private _applyFiles;
        private _applyFileExtendedOptions;
        private _applyFilesWorker;
    }
    interface FileSystemOptions {
        time?: number;
        files?: FileSet;
        cwd?: string;
        meta?: Record<string, any>;
    }
    interface FileSystemCreateOptions extends FileSystemOptions {
        documents?: readonly documents.TextDocument[];
    }
    type Axis = "ancestors" | "ancestors-or-self" | "self" | "descendants-or-self" | "descendants";
    interface Traversal {
        /** A function called to choose whether to continue to traverse to either ancestors or descendants. */
        traverse?(path: string, stats: Stats): boolean;
        /** A function called to choose whether to accept a path as part of the result. */
        accept?(path: string, stats: Stats): boolean;
    }
    interface FileSystemResolver {
        statSync(path: string): {
            mode: number;
            size: number;
        };
        readdirSync(path: string): string[];
        readFileSync(path: string): Buffer;
    }
    interface FileSystemResolverHost {
        useCaseSensitiveFileNames(): boolean;
        getAccessibleFileSystemEntries(path: string): ts.FileSystemEntries;
        directoryExists(path: string): boolean;
        fileExists(path: string): boolean;
        getFileSize(path: string): number;
        readFile(path: string): string | undefined;
        getWorkspaceRoot(): string;
    }
    function createResolver(host: FileSystemResolverHost): FileSystemResolver;
    /**
     * Create a virtual file system from a physical file system using the following path mappings:
     *
     *  - `/.ts` is a directory mapped to `${workspaceRoot}/built/local`
     *  - `/.lib` is a directory mapped to `${workspaceRoot}/tests/lib`
     *  - `/.src` is a virtual directory to be used for tests.
     *
     * Unless overridden, `/.src` will be the current working directory for the virtual file system.
     */
    function createFromFileSystem(host: FileSystemResolverHost, ignoreCase: boolean, { documents, files, cwd, time, meta }?: FileSystemCreateOptions): FileSystem;
    class Stats {
        dev: number;
        ino: number;
        mode: number;
        nlink: number;
        uid: number;
        gid: number;
        rdev: number;
        size: number;
        blksize: number;
        blocks: number;
        atimeMs: number;
        mtimeMs: number;
        ctimeMs: number;
        birthtimeMs: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
        birthtime: Date;
        constructor();
        constructor(dev: number, ino: number, mode: number, nlink: number, rdev: number, size: number, blksize: number, blocks: number, atimeMs: number, mtimeMs: number, ctimeMs: number, birthtimeMs: number);
        isFile(): boolean;
        isDirectory(): boolean;
        isSymbolicLink(): boolean;
        isBlockDevice(): boolean;
        isCharacterDevice(): boolean;
        isFIFO(): boolean;
        isSocket(): boolean;
    }
    const IOErrorMessages: Readonly<{
        EACCES: "access denied";
        EIO: "an I/O error occurred";
        ENOENT: "no such file or directory";
        EEXIST: "file already exists";
        ELOOP: "too many symbolic links encountered";
        ENOTDIR: "no such directory";
        EISDIR: "path is a directory";
        EBADF: "invalid file descriptor";
        EINVAL: "invalid value";
        ENOTEMPTY: "directory not empty";
        EPERM: "operation not permitted";
        EROFS: "file system is read-only";
    }>;
    function createIOError(code: keyof typeof IOErrorMessages, details?: string): NodeJS.ErrnoException;
    /**
     * A template used to populate files, directories, links, etc. in a virtual file system.
     */
    interface FileSet {
        [name: string]: DirectoryLike | FileLike | Link | Symlink | Mount | Rmdir | Unlink | null | undefined;
    }
    type DirectoryLike = FileSet | Directory;
    type FileLike = File | Buffer | string;
    /** Extended options for a directory in a `FileSet` */
    class Directory {
        readonly files: FileSet;
        readonly meta: Record<string, any> | undefined;
        constructor(files: FileSet, { meta }?: {
            meta?: Record<string, any>;
        });
    }
    /** Extended options for a file in a `FileSet` */
    class File {
        readonly data: Buffer | string;
        readonly encoding: string | undefined;
        readonly meta: Record<string, any> | undefined;
        constructor(data: Buffer | string, { meta, encoding }?: {
            encoding?: string;
            meta?: Record<string, any>;
        });
    }
    class SameFileContentFile extends File {
        constructor(data: Buffer | string, metaAndEncoding?: {
            encoding?: string;
            meta?: Record<string, any>;
        });
    }
    class SameFileWithModifiedTime extends File {
        constructor(data: Buffer | string, metaAndEncoding?: {
            encoding?: string;
            meta?: Record<string, any>;
        });
    }
    /** Extended options for a hard link in a `FileSet` */
    class Link {
        readonly path: string;
        constructor(path: string);
    }
    /** Removes a directory in a `FileSet` */
    class Rmdir {
        _rmdirBrand?: never;
    }
    /** Unlinks a file in a `FileSet` */
    class Unlink {
        _unlinkBrand?: never;
    }
    /** Extended options for a symbolic link in a `FileSet` */
    class Symlink {
        readonly symlink: string;
        readonly meta: Record<string, any> | undefined;
        constructor(symlink: string, { meta }?: {
            meta?: Record<string, any>;
        });
    }
    /** Extended options for mounting a virtual copy of an external file system via a `FileSet` */
    class Mount {
        readonly source: string;
        readonly resolver: FileSystemResolver;
        readonly meta: Record<string, any> | undefined;
        constructor(source: string, resolver: FileSystemResolver, { meta }?: {
            meta?: Record<string, any>;
        });
    }
    function formatPatch(patch: FileSet): string;
    function formatPatch(patch: FileSet | undefined): string | null;
    function iteratePatch(patch: FileSet | undefined): IterableIterator<[string, string]> | null;
}
/**
 * Test harness compiler functionality.
 */
declare namespace compiler {
    interface Project {
        file: string;
        config?: ts.ParsedCommandLine;
        errors?: ts.Diagnostic[];
    }
    function readProject(host: fakes.ParseConfigHost, project: string | undefined, existingOptions?: ts.CompilerOptions): Project | undefined;
    /**
     * Correlates compilation inputs and outputs
     */
    interface CompilationOutput {
        readonly inputs: readonly documents.TextDocument[];
        readonly js: documents.TextDocument | undefined;
        readonly dts: documents.TextDocument | undefined;
        readonly map: documents.TextDocument | undefined;
    }
    class CompilationResult {
        readonly host: fakes.CompilerHost;
        readonly program: ts.Program | undefined;
        readonly result: ts.EmitResult | undefined;
        readonly options: ts.CompilerOptions;
        readonly diagnostics: readonly ts.Diagnostic[];
        readonly js: ReadonlyMap<string, documents.TextDocument>;
        readonly dts: ReadonlyMap<string, documents.TextDocument>;
        readonly maps: ReadonlyMap<string, documents.TextDocument>;
        symlinks?: vfs.FileSet;
        private _inputs;
        private _inputsAndOutputs;
        constructor(host: fakes.CompilerHost, options: ts.CompilerOptions, program: ts.Program | undefined, result: ts.EmitResult | undefined, diagnostics: readonly ts.Diagnostic[]);
        get vfs(): vfs.FileSystem;
        get inputs(): readonly documents.TextDocument[];
        get outputs(): readonly documents.TextDocument[];
        get traces(): readonly string[];
        get emitSkipped(): boolean;
        get singleFile(): boolean;
        get commonSourceDirectory(): string;
        getInputsAndOutputs(path: string): CompilationOutput | undefined;
        getInputs(path: string): readonly documents.TextDocument[] | undefined;
        getOutput(path: string, kind: "js" | "dts" | "map"): documents.TextDocument | undefined;
        getSourceMapRecord(): string | undefined;
        getSourceMap(path: string): documents.SourceMap | undefined;
        getOutputPath(path: string, ext: string): string;
        getNumberOfJsFiles(includeJson: boolean): number;
    }
    function compileFiles(host: fakes.CompilerHost, rootFiles: string[] | undefined, compilerOptions: ts.CompilerOptions): CompilationResult;
}
declare namespace evaluator {
    function evaluateTypeScript(source: string | {
        files: vfs.FileSet;
        rootFiles: string[];
        main: string;
    }, options?: ts.CompilerOptions, globals?: Record<string, any>): any;
    function evaluateJavaScript(sourceText: string, globals?: Record<string, any>, sourceFile?: string): any;
}
/**
 * Fake implementations of various compiler dependencies.
 */
declare namespace fakes {
    export interface SystemOptions {
        executingFilePath?: string;
        newLine?: "\r\n" | "\n";
        env?: Record<string, string>;
    }
    /**
     * A fake `ts.System` that leverages a virtual file system.
     */
    export class System implements ts.System {
        readonly vfs: vfs.FileSystem;
        readonly args: string[];
        readonly output: string[];
        readonly newLine: string;
        readonly useCaseSensitiveFileNames: boolean;
        exitCode: number | undefined;
        private readonly _executingFilePath;
        private readonly _env;
        constructor(vfs: vfs.FileSystem, { executingFilePath, newLine, env }?: SystemOptions);
        private testTerminalWidth;
        getWidthOfTerminal: (() => number) | undefined;
        writeOutputIsTTY(): boolean;
        write(message: string): void;
        readFile(path: string): string | undefined;
        writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
        deleteFile(path: string): void;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(path: string): void;
        getCurrentDirectory(): string;
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
        getAccessibleFileSystemEntries(path: string): ts.FileSystemEntries;
        exit(exitCode?: number): void;
        getFileSize(path: string): number;
        resolvePath(path: string): string;
        getExecutingFilePath(): string;
        getModifiedTime(path: string): Date;
        setModifiedTime(path: string, time: Date): void;
        createHash(data: string): string;
        realpath(path: string): string;
        getEnvironmentVariable(name: string): string;
        private _getStats;
        now(): Date;
    }
    /**
     * A fake `ts.ParseConfigHost` that leverages a virtual file system.
     */
    export class ParseConfigHost implements ts.ParseConfigHost {
        readonly sys: System;
        constructor(sys: System | vfs.FileSystem);
        get vfs(): vfs.FileSystem;
        get useCaseSensitiveFileNames(): boolean;
        fileExists(fileName: string): boolean;
        directoryExists(directoryName: string): boolean;
        readFile(path: string): string | undefined;
        readDirectory(path: string, extensions: string[], excludes: string[], includes: string[], depth: number): string[];
    }
    /**
     * A fake `ts.CompilerHost` that leverages a virtual file system.
     */
    export class CompilerHost implements ts.CompilerHost {
        readonly sys: System;
        readonly defaultLibLocation: string;
        readonly outputs: documents.TextDocument[];
        private readonly _outputsMap;
        readonly traces: string[];
        readonly shouldAssertInvariants: boolean;
        private _setParentNodes;
        private _sourceFiles;
        private _parseConfigHost;
        private _newLine;
        constructor(sys: System | vfs.FileSystem, options?: ts.CompilerOptions, setParentNodes?: boolean);
        get vfs(): vfs.FileSystem;
        get parseConfigHost(): ParseConfigHost;
        getCurrentDirectory(): string;
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;
        getCanonicalFileName(fileName: string): string;
        deleteFile(fileName: string): void;
        fileExists(fileName: string): boolean;
        directoryExists(directoryName: string): boolean;
        getModifiedTime(fileName: string): Date;
        setModifiedTime(fileName: string, time: Date): void;
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
        readFile(path: string): string | undefined;
        writeFile(fileName: string, content: string, writeByteOrderMark: boolean): void;
        trace(s: string): void;
        realpath(path: string): string;
        getDefaultLibLocation(): string;
        getDefaultLibFileName(options: ts.CompilerOptions): string;
        getSourceFile(fileName: string, languageVersion: number): ts.SourceFile | undefined;
    }
    export type ExpectedDiagnosticMessage = [ts.DiagnosticMessage, ...(string | number)[]];
    export interface ExpectedDiagnosticMessageChain {
        message: ExpectedDiagnosticMessage;
        next?: ExpectedDiagnosticMessageChain[];
    }
    export interface ExpectedDiagnosticLocation {
        file: string;
        start: number;
        length: number;
    }
    export interface ExpectedDiagnosticRelatedInformation extends ExpectedDiagnosticMessageChain {
        location?: ExpectedDiagnosticLocation;
    }
    export enum DiagnosticKind {
        Error = "Error",
        Status = "Status"
    }
    export interface ExpectedErrorDiagnostic extends ExpectedDiagnosticRelatedInformation {
        relatedInformation?: ExpectedDiagnosticRelatedInformation[];
    }
    export type ExpectedDiagnostic = ExpectedDiagnosticMessage | ExpectedErrorDiagnostic;
    interface SolutionBuilderDiagnostic {
        kind: DiagnosticKind;
        diagnostic: ts.Diagnostic;
    }
    export const version = "FakeTSVersion";
    export function patchHostForBuildInfoReadWrite<T extends ts.System>(sys: T): T;
    export function patchHostForBuildInfoWrite<T extends ts.System>(sys: T, version: string): T;
    export class SolutionBuilderHost extends CompilerHost implements ts.SolutionBuilderHost<ts.BuilderProgram> {
        createProgram: ts.CreateProgram<ts.BuilderProgram>;
        private constructor();
        static create(sys: System | vfs.FileSystem, options?: ts.CompilerOptions, setParentNodes?: boolean, createProgram?: ts.CreateProgram<ts.BuilderProgram>): SolutionBuilderHost;
        createHash(data: string): string;
        diagnostics: SolutionBuilderDiagnostic[];
        reportDiagnostic(diagnostic: ts.Diagnostic): void;
        reportSolutionBuilderStatus(diagnostic: ts.Diagnostic): void;
        clearDiagnostics(): void;
        assertDiagnosticMessages(...expectedDiagnostics: ExpectedDiagnostic[]): void;
        assertErrors(...expectedDiagnostics: ExpectedErrorDiagnostic[]): void;
        printDiagnostics(header?: string): void;
        now(): Date;
    }
    export {};
}
declare namespace ts.server {
    interface SessionClientHost extends LanguageServiceHost {
        writeMessage(message: string): void;
    }
    function extractMessage(message: string): string;
    class SessionClient implements LanguageService {
        private host;
        private sequence;
        private lineMaps;
        private messages;
        private lastRenameEntry;
        private preferences;
        constructor(host: SessionClientHost);
        onMessage(message: string): void;
        private writeMessage;
        private getLineMap;
        private lineOffsetToPosition;
        private positionToOneBasedLineOffset;
        private convertCodeEditsToTextChange;
        private processRequest;
        private processResponse;
        configure(preferences: UserPreferences): void;
        setFormattingOptions(formatOptions: FormatCodeSettings): void;
        setCompilerOptionsForInferredProjects(options: protocol.CompilerOptions): void;
        openFile(file: string, fileContent?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void;
        closeFile(file: string): void;
        createChangeFileRequestArgs(fileName: string, start: number, end: number, insertString: string): protocol.ChangeRequestArgs;
        changeFile(fileName: string, args: protocol.ChangeRequestArgs): void;
        toLineColumnOffset(fileName: string, position: number): {
            line: number;
            character: number;
        };
        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo;
        getProjectInfo(file: string, needFileNameList: boolean): protocol.ProjectInfo;
        getCompletionsAtPosition(fileName: string, position: number, _preferences: UserPreferences | undefined): CompletionInfo;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string, _options: FormatCodeOptions | FormatCodeSettings | undefined, source: string | undefined, _preferences: UserPreferences | undefined, data: unknown): CompletionEntryDetails;
        getCompletionEntrySymbol(_fileName: string, _position: number, _entryName: string): Symbol;
        getNavigateToItems(searchValue: string): NavigateToItem[];
        getFormattingEditsForRange(file: string, start: number, end: number, _options: FormatCodeOptions): TextChange[];
        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): TextChange[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, _options: FormatCodeOptions): TextChange[];
        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getDefinitionAndBoundSpan(fileName: string, position: number): DefinitionInfoAndBoundSpan;
        getTypeDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getSourceDefinitionAndBoundSpan(fileName: string, position: number): DefinitionInfo[];
        getImplementationAtPosition(fileName: string, position: number): ImplementationLocation[];
        findReferences(fileName: string, position: number): ReferencedSymbol[];
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getFileReferences(fileName: string): ReferenceEntry[];
        getEmitOutput(file: string): EmitOutput;
        getSyntacticDiagnostics(file: string): DiagnosticWithLocation[];
        getSemanticDiagnostics(file: string): Diagnostic[];
        getSuggestionDiagnostics(file: string): DiagnosticWithLocation[];
        private getDiagnostics;
        getCompilerOptionsDiagnostics(): Diagnostic[];
        getRenameInfo(fileName: string, position: number, _preferences: UserPreferences, findInStrings?: boolean, findInComments?: boolean): RenameInfo;
        getSmartSelectionRange(): never;
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, providePrefixAndSuffixTextForRename?: boolean): RenameLocation[];
        private decodeNavigationBarItems;
        getNavigationBarItems(file: string): NavigationBarItem[];
        private decodeNavigationTree;
        getNavigationTree(file: string): NavigationTree;
        private decodeSpan;
        private decodeLinkDisplayParts;
        getNameOrDottedNameSpan(_fileName: string, _startPos: number, _endPos: number): TextSpan;
        getBreakpointStatementAtPosition(_fileName: string, _position: number): TextSpan;
        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems | undefined;
        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[];
        getOutliningSpans(file: string): OutliningSpan[];
        getTodoComments(_fileName: string, _descriptors: TodoCommentDescriptor[]): TodoComment[];
        getDocCommentTemplateAtPosition(_fileName: string, _position: number, _options?: DocCommentTemplateOptions): TextInsertion;
        isValidBraceCompletionAtPosition(_fileName: string, _position: number, _openingBrace: number): boolean;
        getJsxClosingTagAtPosition(_fileName: string, _position: number): never;
        getSpanOfEnclosingComment(_fileName: string, _position: number, _onlyMultiLine: boolean): TextSpan;
        getCodeFixesAtPosition(file: string, start: number, end: number, errorCodes: readonly number[]): readonly CodeFixAction[];
        getCombinedCodeFix: typeof notImplemented;
        applyCodeActionCommand: typeof notImplemented;
        provideInlayHints(file: string, span: TextSpan): InlayHint[];
        private createFileLocationOrRangeRequestArgs;
        private createFileLocationRequestArgs;
        private createFileRangeRequestArgs;
        private createFileLocationRequestArgsWithEndLineAndOffset;
        getApplicableRefactors(fileName: string, positionOrRange: number | TextRange): ApplicableRefactorInfo[];
        getEditsForRefactor(fileName: string, _formatOptions: FormatCodeSettings, positionOrRange: number | TextRange, refactorName: string, actionName: string): RefactorEditInfo;
        organizeImports(_args: OrganizeImportsArgs, _formatOptions: FormatCodeSettings): readonly FileTextChanges[];
        getEditsForFileRename(): never;
        private convertCodeEditsToTextChanges;
        private convertChanges;
        convertTextChangeToCodeEdit(change: protocol.CodeEdit, fileName: string): TextChange;
        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[];
        configurePlugin(pluginName: string, configuration: any): void;
        getIndentationAtPosition(_fileName: string, _position: number, _options: EditorOptions): number;
        getSyntacticClassifications(_fileName: string, _span: TextSpan): ClassifiedSpan[];
        getSemanticClassifications(_fileName: string, _span: TextSpan): ClassifiedSpan[];
        getEncodedSyntacticClassifications(_fileName: string, _span: TextSpan): Classifications;
        getEncodedSemanticClassifications(file: string, span: TextSpan, format?: SemanticClassificationFormat): Classifications;
        private convertCallHierarchyItem;
        prepareCallHierarchy(fileName: string, position: number): CallHierarchyItem | CallHierarchyItem[] | undefined;
        private convertCallHierarchyIncomingCall;
        provideCallHierarchyIncomingCalls(fileName: string, position: number): CallHierarchyIncomingCall[];
        private convertCallHierarchyOutgoingCall;
        provideCallHierarchyOutgoingCalls(fileName: string, position: number): CallHierarchyOutgoingCall[];
        getProgram(): Program;
        getCurrentProgram(): Program | undefined;
        getAutoImportProvider(): Program | undefined;
        updateIsDefinitionOfReferencedSymbols(_referencedSymbols: readonly ReferencedSymbol[], _knownSymbolSpans: Set<DocumentSpan>): boolean;
        getNonBoundSourceFile(_fileName: string): SourceFile;
        getSourceFile(_fileName: string): SourceFile;
        cleanupSemanticCache(): void;
        getSourceMapper(): never;
        clearSourceMapperCache(): never;
        toggleLineComment(): TextChange[];
        toggleMultilineComment(): TextChange[];
        commentSelection(): TextChange[];
        uncommentSelection(): TextChange[];
        dispose(): void;
    }
}
declare namespace Utils {
    function findUpFile(name: string): string;
    const findUpRoot: {
        (): string;
        cached?: string;
    };
}
declare namespace Harness {
    type TestRunnerKind = CompilerTestKind | FourslashTestKind | "project" | "rwc" | "test262" | "user" | "dt" | "docker";
    type CompilerTestKind = "conformance" | "compiler";
    type FourslashTestKind = "fourslash" | "fourslash-shims" | "fourslash-shims-pp" | "fourslash-server";
    let shards: number;
    let shardId: number;
    function setShards(count: number): void;
    function setShardId(id: number): void;
    abstract class RunnerBase {
        tests: (string | FileBasedTest)[];
        /** Add a source file to the runner's list of tests that need to be initialized with initializeTests */
        addTest(fileName: string): void;
        enumerateFiles(folder: string, regex?: RegExp, options?: {
            recursive: boolean;
        }): string[];
        abstract kind(): TestRunnerKind;
        abstract enumerateTestFiles(): (string | FileBasedTest)[];
        getTestFiles(): ReturnType<this["enumerateTestFiles"]>;
        /** The working directory where tests are found. Needed for batch testing where the input path will differ from the output path inside baselines */
        workingDirectory: string;
        /** Setup the runner's tests so that they are ready to be executed by the harness
         *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
         */
        abstract initializeTests(): void;
        /** Replaces instances of full paths with fileNames only */
        static removeFullPaths(path: string): string;
    }
}
declare namespace Harness.SourceMapRecorder {
    function getSourceMapRecord(sourceMapDataList: readonly ts.SourceMapEmitResult[], program: ts.Program, jsFiles: readonly documents.TextDocument[], declarationFiles: readonly documents.TextDocument[]): string;
    function getSourceMapRecordWithSystem(sys: ts.System, sourceMapFile: string): string;
}
declare var assert: typeof _chai.assert;
declare var expect: typeof _chai.expect;
declare var _chai: typeof import("chai");
declare namespace ts { }
declare namespace Utils {
    function encodeString(s: string): string;
    function byteLength(s: string, encoding?: string): number;
    function evalFile(fileContents: string, fileName: string, nodeContext?: any): void;
    /** Splits the given string on \r\n, or on only \n if that fails, or on only \r if *that* fails. */
    function splitContentByNewlines(content: string): string[];
    /** Reads a file under /tests */
    function readTestFile(path: string): string | undefined;
    function memoize<T extends ts.AnyFunction>(f: T, memoKey: (...anything: any[]) => string): T;
    const canonicalizeForHarness: ts.GetCanonicalFileName;
    function assertInvariants(node: ts.Node | undefined, parent: ts.Node | undefined): void;
    function convertDiagnostics(diagnostics: readonly ts.Diagnostic[]): {
        start: number | undefined;
        length: number | undefined;
        messageText: string;
        category: string;
        code: number;
    }[];
    function sourceFileToJSON(file: ts.Node): string;
    function assertDiagnosticsEquals(array1: readonly ts.Diagnostic[], array2: readonly ts.Diagnostic[]): void;
    function assertStructuralEquals(node1: ts.Node, node2: ts.Node): void;
    function filterStack(error: Error, stackTraceLimit?: number): Error;
}
declare namespace Harness {
    interface IO {
        newLine(): string;
        getCurrentDirectory(): string;
        useCaseSensitiveFileNames(): boolean;
        resolvePath(path: string): string | undefined;
        getFileSize(path: string): number;
        readFile(path: string): string | undefined;
        writeFile(path: string, contents: string): void;
        directoryName(path: string): string | undefined;
        getDirectories(path: string): string[];
        createDirectory(path: string): void;
        fileExists(fileName: string): boolean;
        directoryExists(path: string): boolean;
        deleteFile(fileName: string): void;
        enumerateTestFiles(runner: RunnerBase): (string | FileBasedTest)[];
        listFiles(path: string, filter?: RegExp, options?: {
            recursive?: boolean;
        }): string[];
        log(text: string): void;
        args(): string[];
        getExecutingFilePath(): string;
        getWorkspaceRoot(): string;
        exit(exitCode?: number): void;
        readDirectory(path: string, extension?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): readonly string[];
        getAccessibleFileSystemEntries(dirname: string): ts.FileSystemEntries;
        tryEnableSourceMapsForHost?(): void;
        getEnvironmentVariable?(name: string): string;
        getMemoryUsage?(): number | undefined;
        joinPath(...components: string[]): string;
    }
    let IO: IO;
    function setHarnessIO(io: IO): void;
    const harnessNewLine = "\r\n";
    const virtualFileSystemRoot = "/";
    function mockHash(s: string): string;
    const libFolder = "built/local/";
    type SourceMapEmitterCallback = (emittedFile: string, emittedLine: number, emittedColumn: number, sourceFile: string, sourceLine: number, sourceColumn: number, sourceName: string) => void;
    let userSpecifiedRoot: string;
    let lightMode: boolean;
    function setLightMode(flag: boolean): void;
    /** Functionality for compiling TypeScript code */
    namespace Compiler {
        /** Aggregate various writes into a single array of lines. Useful for passing to the
         *  TypeScript compiler to fill with source code or errors.
         */
        export class WriterAggregator {
            lines: string[];
            currentLine: string;
            Write(str: string): void;
            WriteLine(str: string): void;
            Close(): void;
            reset(): void;
        }
        export function createSourceFileAndAssertInvariants(fileName: string, sourceText: string, languageVersion: ts.ScriptTarget): ts.SourceFile;
        export const defaultLibFileName = "lib.d.ts";
        export const es2015DefaultLibFileName = "lib.es2015.d.ts";
        export function getDefaultLibrarySourceFile(fileName?: string): ts.SourceFile | undefined;
        export function getDefaultLibFileName(options: ts.CompilerOptions): string;
        export const fourslashFileName = "fourslash.ts";
        export let fourslashSourceFile: ts.SourceFile;
        export function getCanonicalFileName(fileName: string): string;
        interface HarnessOptions {
            useCaseSensitiveFileNames?: boolean;
            includeBuiltFile?: string;
            baselineFile?: string;
            libFiles?: string;
            noTypesAndSymbols?: boolean;
        }
        export function setCompilerOptionsFromHarnessSetting(settings: TestCaseParser.CompilerSettings, options: ts.CompilerOptions & HarnessOptions): void;
        export interface TestFile {
            unitName: string;
            content: string;
            fileOptions?: any;
        }
        export function compileFiles(inputFiles: TestFile[], otherFiles: TestFile[], harnessSettings: TestCaseParser.CompilerSettings | undefined, compilerOptions: ts.CompilerOptions | undefined, currentDirectory: string | undefined, symlinks?: vfs.FileSet): compiler.CompilationResult;
        export interface DeclarationCompilationContext {
            declInputFiles: TestFile[];
            declOtherFiles: TestFile[];
            harnessSettings: TestCaseParser.CompilerSettings & HarnessOptions | undefined;
            options: ts.CompilerOptions;
            currentDirectory: string;
        }
        export function prepareDeclarationCompilationContext(inputFiles: readonly TestFile[], otherFiles: readonly TestFile[], result: compiler.CompilationResult, harnessSettings: TestCaseParser.CompilerSettings & HarnessOptions, options: ts.CompilerOptions, currentDirectory: string | undefined): DeclarationCompilationContext | undefined;
        export function compileDeclarationFiles(context: DeclarationCompilationContext | undefined, symlinks: vfs.FileSet | undefined): {
            declInputFiles: TestFile[];
            declOtherFiles: TestFile[];
            declResult: compiler.CompilationResult;
        } | undefined;
        export function minimalDiagnosticsToString(diagnostics: readonly ts.Diagnostic[], pretty?: boolean): string;
        export function getErrorBaseline(inputFiles: readonly TestFile[], diagnostics: readonly ts.Diagnostic[], pretty?: boolean): string;
        export const diagnosticSummaryMarker = "__diagnosticSummary";
        export const globalErrorsMarker = "__globalErrors";
        export function iterateErrorBaseline(inputFiles: readonly TestFile[], diagnostics: readonly ts.Diagnostic[], options?: {
            pretty?: boolean;
            caseSensitive?: boolean;
            currentDirectory?: string;
        }): IterableIterator<[string, string, number]>;
        export function doErrorBaseline(baselinePath: string, inputFiles: readonly TestFile[], errors: readonly ts.Diagnostic[], pretty?: boolean): void;
        export function doTypeAndSymbolBaseline(baselinePath: string, program: ts.Program, allFiles: {
            unitName: string;
            content: string;
        }[], opts?: Baseline.BaselineOptions, multifile?: boolean, skipTypeBaselines?: boolean, skipSymbolBaselines?: boolean, hasErrorBaseline?: boolean): void;
        export function doSourcemapBaseline(baselinePath: string, options: ts.CompilerOptions, result: compiler.CompilationResult, harnessSettings: TestCaseParser.CompilerSettings): void;
        export function doJsEmitBaseline(baselinePath: string, header: string, options: ts.CompilerOptions, result: compiler.CompilationResult, tsConfigFiles: readonly TestFile[], toBeCompiled: readonly TestFile[], otherFiles: readonly TestFile[], harnessSettings: TestCaseParser.CompilerSettings): void;
        export function collateOutputs(outputFiles: readonly documents.TextDocument[]): string;
        export function iterateOutputs(outputFiles: Iterable<documents.TextDocument>): IterableIterator<[string, string]>;
        export function sanitizeTestFilePath(name: string): string;
        export {};
    }
    interface FileBasedTest {
        file: string;
        configurations?: FileBasedTestConfiguration[];
    }
    interface FileBasedTestConfiguration {
        [key: string]: string;
    }
    /**
     * Compute FileBasedTestConfiguration variations based on a supplied list of variable settings.
     */
    function getFileBasedTestConfigurations(settings: TestCaseParser.CompilerSettings, varyBy: readonly string[]): FileBasedTestConfiguration[] | undefined;
    /**
     * Compute a description for this configuration based on its entries
     */
    function getFileBasedTestConfigurationDescription(configuration: FileBasedTestConfiguration): string;
    namespace TestCaseParser {
        /** all the necessary information to set the right compiler settings */
        interface CompilerSettings {
            [name: string]: string;
        }
        /** All the necessary information to turn a multi file test into useful units for later compilation */
        interface TestUnitData {
            content: string;
            name: string;
            fileOptions: any;
            originalFilePath: string;
            references: string[];
        }
        function parseSymlinkFromTest(line: string, symlinks: vfs.FileSet | undefined): vfs.FileSet | undefined;
        function extractCompilerSettings(content: string): CompilerSettings;
        interface TestCaseContent {
            settings: CompilerSettings;
            testUnitData: TestUnitData[];
            tsConfig: ts.ParsedCommandLine | undefined;
            tsConfigFileUnitData: TestUnitData | undefined;
            symlinks?: vfs.FileSet;
        }
        /** Given a test file containing // @FileName directives, return an array of named units of code to be added to an existing compiler instance */
        function makeUnitsFromTest(code: string, fileName: string, rootDir?: string, settings?: CompilerSettings): TestCaseContent;
    }
    /** Support class for baseline files */
    namespace Baseline {
        interface BaselineOptions {
            Subfolder?: string;
            Baselinefolder?: string;
            PrintDiff?: true;
        }
        function localPath(fileName: string, baselineFolder?: string, subfolder?: string): string;
        function runBaseline(relativeFileName: string, actual: string | null, opts?: BaselineOptions): void;
        function runMultifileBaseline(relativeFileBase: string, extension: string, generateContent: () => IterableIterator<[string, string, number]> | IterableIterator<[string, string]> | null, opts?: BaselineOptions, referencedExtensions?: string[]): void;
    }
    function isDefaultLibraryFile(filePath: string): boolean;
    function isBuiltFile(filePath: string): boolean;
    function getDefaultLibraryFile(filePath: string, io: IO): Compiler.TestFile;
    function getConfigNameFromFileName(filename: string): "tsconfig.json" | "jsconfig.json" | undefined;
}
declare namespace Harness.LanguageService {
    export function makeDefaultProxy(info: ts.server.PluginCreateInfo): ts.LanguageService;
    export class ScriptInfo {
        fileName: string;
        content: string;
        isRootFile: boolean;
        version: number;
        editRanges: {
            length: number;
            textChangeRange: ts.TextChangeRange;
        }[];
        private lineMap;
        constructor(fileName: string, content: string, isRootFile: boolean);
        private setContent;
        getLineMap(): number[];
        updateContent(content: string): void;
        editContent(start: number, end: number, newText: string): void;
        getTextChangeRangeBetweenVersions(startVersion: number, endVersion: number): ts.TextChangeRange;
    }
    class DefaultHostCancellationToken implements ts.HostCancellationToken {
        static readonly instance: DefaultHostCancellationToken;
        isCancellationRequested(): boolean;
    }
    export interface LanguageServiceAdapter {
        getHost(): LanguageServiceAdapterHost;
        getLanguageService(): ts.LanguageService;
        getClassifier(): ts.Classifier;
        getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo;
    }
    export abstract class LanguageServiceAdapterHost {
        protected cancellationToken: DefaultHostCancellationToken;
        protected settings: ts.CompilerOptions;
        readonly sys: fakes.System;
        typesRegistry: ts.ESMap<string, void> | undefined;
        private scriptInfos;
        constructor(cancellationToken?: DefaultHostCancellationToken, settings?: ts.CompilerOptions);
        get vfs(): vfs.FileSystem;
        getNewLine(): string;
        getFilenames(): string[];
        realpath(path: string): string;
        fileExists(path: string): boolean;
        readFile(path: string): string | undefined;
        directoryExists(path: string): boolean;
        getScriptInfo(fileName: string): ScriptInfo | undefined;
        addScript(fileName: string, content: string, isRootFile: boolean): void;
        renameFileOrDirectory(oldPath: string, newPath: string): void;
        editScript(fileName: string, start: number, end: number, newText: string): void;
        openFile(_fileName: string, _content?: string, _scriptKindName?: string): void;
        /**
         * @param line 0 based index
         * @param col 0 based index
         */
        positionToLineAndCharacter(fileName: string, position: number): ts.LineAndCharacter;
        lineAndCharacterToPosition(fileName: string, lineAndCharacter: ts.LineAndCharacter): number;
        useCaseSensitiveFileNames(): boolean;
    }
    class NativeLanguageServiceHost extends LanguageServiceAdapterHost implements ts.LanguageServiceHost, LanguageServiceAdapterHost {
        isKnownTypesPackageName(name: string): boolean;
        getGlobalTypingsCacheLocation(): string;
        installPackage: typeof ts.notImplemented;
        getCompilationSettings(): ts.CompilerOptions;
        getCancellationToken(): DefaultHostCancellationToken;
        getDirectories(path: string): string[];
        getCurrentDirectory(): string;
        getDefaultLibFileName(): string;
        getScriptFileNames(): string[];
        getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined;
        getScriptKind(): ts.ScriptKind;
        getScriptVersion(fileName: string): string;
        directoryExists(dirName: string): boolean;
        fileExists(fileName: string): boolean;
        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
        readFile(path: string): string | undefined;
        realpath(path: string): string;
        getTypeRootsVersion(): number;
        log: typeof ts.noop;
        trace: typeof ts.noop;
        error: typeof ts.noop;
    }
    export class NativeLanguageServiceAdapter implements LanguageServiceAdapter {
        private host;
        constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions);
        getHost(): LanguageServiceAdapterHost;
        getLanguageService(): ts.LanguageService;
        getClassifier(): ts.Classifier;
        getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo;
    }
    class ShimLanguageServiceHost extends LanguageServiceAdapterHost implements ts.LanguageServiceShimHost, ts.CoreServicesShimHost {
        private nativeHost;
        getModuleResolutionsForFile: ((fileName: string) => string) | undefined;
        getTypeReferenceDirectiveResolutionsForFile: ((fileName: string) => string) | undefined;
        constructor(preprocessToResolve: boolean, cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions);
        getFilenames(): string[];
        getScriptInfo(fileName: string): ScriptInfo | undefined;
        addScript(fileName: string, content: string, isRootFile: boolean): void;
        editScript(fileName: string, start: number, end: number, newText: string): void;
        positionToLineAndCharacter(fileName: string, position: number): ts.LineAndCharacter;
        getCompilationSettings(): string;
        getCancellationToken(): ts.HostCancellationToken;
        getCurrentDirectory(): string;
        getDirectories(path: string): string;
        getDefaultLibFileName(): string;
        getScriptFileNames(): string;
        getScriptSnapshot(fileName: string): ts.ScriptSnapshotShim;
        getScriptKind(): ts.ScriptKind;
        getScriptVersion(fileName: string): string;
        getLocalizedDiagnosticMessages(): string;
        readDirectory: typeof ts.notImplemented;
        readDirectoryNames: typeof ts.notImplemented;
        readFileNames: typeof ts.notImplemented;
        fileExists(fileName: string): boolean;
        readFile(fileName: string): string | undefined;
        log(s: string): void;
        trace(s: string): void;
        error(s: string): void;
        directoryExists(): boolean;
    }
    export class ShimLanguageServiceAdapter implements LanguageServiceAdapter {
        private host;
        private factory;
        constructor(preprocessToResolve: boolean, cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions);
        getHost(): ShimLanguageServiceHost;
        getLanguageService(): ts.LanguageService;
        getClassifier(): ts.Classifier;
        getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo;
    }
    class SessionClientHost extends NativeLanguageServiceHost implements ts.server.SessionClientHost {
        private client;
        constructor(cancellationToken: ts.HostCancellationToken | undefined, settings: ts.CompilerOptions | undefined);
        onMessage: typeof ts.noop;
        writeMessage: typeof ts.noop;
        setClient(client: ts.server.SessionClient): void;
        openFile(fileName: string, content?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void;
        editScript(fileName: string, start: number, end: number, newText: string): void;
    }
    export class ServerLanguageServiceAdapter implements LanguageServiceAdapter {
        private host;
        private client;
        private server;
        constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions);
        getHost(): SessionClientHost;
        getLanguageService(): ts.LanguageService;
        getClassifier(): ts.Classifier;
        getPreProcessedFileInfo(): ts.PreProcessedFileInfo;
        assertTextConsistent(fileName: string): void;
    }
    export {};
}
declare namespace ts.TestFSWithWatch {
    export const libFile: File;
    export interface TestServerHostCreationParameters {
        useCaseSensitiveFileNames?: boolean;
        executingFilePath?: string;
        currentDirectory?: string;
        newLine?: string;
        windowsStyleRoot?: string;
        environmentVariables?: ESMap<string, string>;
        runWithoutRecursiveWatches?: boolean;
        runWithFallbackPolling?: boolean;
        inodeWatching?: boolean;
    }
    export function createWatchedSystem(fileOrFolderList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[], params?: TestServerHostCreationParameters): TestServerHost;
    export function createServerHost(fileOrFolderList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[], params?: TestServerHostCreationParameters): TestServerHost;
    export interface File {
        path: string;
        content: string;
        fileSize?: number;
    }
    export interface Folder {
        path: string;
    }
    export interface SymLink {
        /** Location of the symlink. */
        path: string;
        /** Relative path to the real file. */
        symLink: string;
    }
    export type FileOrFolderOrSymLink = File | Folder | SymLink;
    export interface FileOrFolderOrSymLinkMap {
        [path: string]: string | Omit<FileOrFolderOrSymLink, "path">;
    }
    export function isFile(fileOrFolderOrSymLink: FileOrFolderOrSymLink): fileOrFolderOrSymLink is File;
    export function isSymLink(fileOrFolderOrSymLink: FileOrFolderOrSymLink): fileOrFolderOrSymLink is SymLink;
    interface FSEntryBase {
        path: Path;
        fullPath: string;
        modifiedTime: Date;
    }
    interface FsFile extends FSEntryBase {
        content: string;
        fileSize?: number;
    }
    interface FsFolder extends FSEntryBase {
        entries: SortedArray<FSEntry>;
    }
    interface FsSymLink extends FSEntryBase {
        symLink: string;
    }
    export type FSEntry = FsFile | FsFolder | FsSymLink;
    export function getDiffInKeys<T>(map: ESMap<string, T>, expectedKeys: readonly string[]): string;
    export function verifyMapSize(caption: string, map: ESMap<string, any>, expectedKeys: readonly string[]): void;
    export type MapValueTester<T, U> = [ESMap<string, U[]> | undefined, (value: T) => U];
    export function checkMap<T, U = undefined>(caption: string, actual: MultiMap<string, T>, expectedKeys: ReadonlyESMap<string, number>, valueTester?: MapValueTester<T, U>): void;
    export function checkMap<T, U = undefined>(caption: string, actual: MultiMap<string, T>, expectedKeys: readonly string[], eachKeyCount: number, valueTester?: MapValueTester<T, U>): void;
    export function checkMap<T>(caption: string, actual: ESMap<string, T> | MultiMap<string, T>, expectedKeys: readonly string[], eachKeyCount: undefined): void;
    export function checkArray(caption: string, actual: readonly string[], expected: readonly string[]): void;
    export function checkOutputContains(host: TestServerHost, expected: readonly string[]): void;
    export function checkOutputDoesNotContain(host: TestServerHost, expectedToBeAbsent: string[] | readonly string[]): void;
    type TimeOutCallback = (...args: any[]) => void;
    export interface TestFileWatcher {
        cb: FileWatcherCallback;
        pollingInterval: PollingInterval;
    }
    export interface TestFsWatcher {
        cb: FsWatchCallback;
        inode: number | undefined;
    }
    export interface WatchInvokeOptions {
        /** Invokes the directory watcher for the parent instead of the file changed */
        invokeDirectoryWatcherInsteadOfFileChanged: boolean;
        /** When new file is created, do not invoke watches for it */
        ignoreWatchInvokedWithTriggerAsFileCreate: boolean;
        /** Invoke the file delete, followed by create instead of file changed */
        invokeFileDeleteCreateAsPartInsteadOfChange: boolean;
        /** Dont invoke delete watches */
        ignoreDelete: boolean;
        /** Skip inode check on file or folder create*/
        skipInodeCheckOnCreate: boolean;
        /** When invoking rename event on fs watch, send event with file name suffixed with tilde */
        useTildeAsSuffixInRenameEventFileName: boolean;
    }
    export enum Tsc_WatchFile {
        DynamicPolling = "DynamicPriorityPolling"
    }
    export enum Tsc_WatchDirectory {
        WatchFile = "RecursiveDirectoryUsingFsWatchFile",
        NonRecursiveWatchDirectory = "RecursiveDirectoryUsingNonRecursiveWatchDirectory",
        DynamicPolling = "RecursiveDirectoryUsingDynamicPriorityPolling"
    }
    export const timeIncrements = 1000;
    export interface TestServerHostOptions {
        useCaseSensitiveFileNames: boolean;
        executingFilePath: string;
        currentDirectory: string;
        newLine?: string;
        useWindowsStylePaths?: boolean;
        environmentVariables?: ESMap<string, string>;
    }
    export class TestServerHost implements server.ServerHost, FormatDiagnosticsHost, ModuleResolutionHost {
        args: string[];
        private readonly output;
        private fs;
        private time;
        getCanonicalFileName: (s: string) => string;
        private toPath;
        private timeoutCallbacks;
        private immediateCallbacks;
        readonly screenClears: number[];
        readonly watchedFiles: MultiMap<Path, TestFileWatcher>;
        readonly fsWatches: MultiMap<Path, TestFsWatcher>;
        readonly fsWatchesRecursive: MultiMap<Path, TestFsWatcher>;
        runWithFallbackPolling: boolean;
        readonly useCaseSensitiveFileNames: boolean;
        readonly newLine: string;
        readonly windowsStyleRoot?: string;
        private readonly environmentVariables?;
        private readonly executingFilePath;
        private readonly currentDirectory;
        require: ((initialPath: string, moduleName: string) => RequireResult) | undefined;
        storeFilesChangingSignatureDuringEmit: boolean;
        watchFile: HostWatchFile;
        private inodeWatching;
        private readonly inodes?;
        watchDirectory: HostWatchDirectory;
        constructor(fileOrFolderorSymLinkList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[], { useCaseSensitiveFileNames, executingFilePath, currentDirectory, newLine, windowsStyleRoot, environmentVariables, runWithoutRecursiveWatches, runWithFallbackPolling, inodeWatching, }?: TestServerHostCreationParameters);
        private nextInode;
        private setInode;
        writeOutputIsTTY(): boolean;
        getNewLine(): string;
        toNormalizedAbsolutePath(s: string): string;
        toFullPath(s: string): Path;
        getHostSpecificPath(s: string): string;
        now(): Date;
        getTime(): number;
        setTime(time: number): void;
        private reloadFS;
        modifyFile(filePath: string, content: string, options?: Partial<WatchInvokeOptions>): void;
        renameFile(fileName: string, newFileName: string): void;
        renameFolder(folderName: string, newFolderName: string): void;
        private renameFolderEntries;
        ensureFileOrFolder(fileOrDirectoryOrSymLink: FileOrFolderOrSymLink, ignoreWatchInvokedWithTriggerAsFileCreate?: boolean, ignoreParentWatch?: boolean, options?: Partial<WatchInvokeOptions>): void;
        private ensureFolder;
        private addFileOrFolderInFolder;
        private removeFileOrFolder;
        deleteFile(filePath: string): void;
        deleteFolder(folderPath: string, recursive?: boolean): void;
        private watchFileWorker;
        private fsWatchWorker;
        invokeFileWatcher(fileFullPath: string, eventKind: FileWatcherEventKind, modifiedTime: Date | undefined): void;
        private fsWatchCallback;
        invokeFsWatchesCallbacks(fullPath: string, eventName: "rename" | "change", modifiedTime?: Date, entryFullPath?: string, useTildeSuffix?: boolean): void;
        invokeFsWatchesRecursiveCallbacks(fullPath: string, eventName: "rename" | "change", modifiedTime?: Date, entryFullPath?: string, useTildeSuffix?: boolean): void;
        private getRelativePathToDirectory;
        private invokeRecursiveFsWatches;
        private invokeFsWatches;
        private invokeFileAndFsWatches;
        private toFsEntry;
        private toFsFile;
        private toFsSymLink;
        private toFsFolder;
        private getRealFsEntry;
        private isFsFile;
        private getRealFile;
        private isFsFolder;
        private getRealFolder;
        fileSystemEntryExists(s: string, entryKind: FileSystemEntryKind): boolean;
        fileExists(s: string): boolean;
        getModifiedTime(s: string): Date;
        setModifiedTime(s: string, date: Date): void;
        readFile(s: string): string | undefined;
        getFileSize(s: string): number;
        directoryExists(s: string): boolean;
        getDirectories(s: string): string[];
        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
        createHash(s: string): string;
        createSHA256Hash(s: string): string;
        setTimeout(callback: TimeOutCallback, ms: number, ...args: any[]): number;
        getNextTimeoutId(): number;
        clearTimeout(timeoutId: any): void;
        clearScreen(): void;
        checkTimeoutQueueLengthAndRun(expected: number): void;
        checkTimeoutQueueLength(expected: number): void;
        runQueuedTimeoutCallbacks(timeoutId?: number): void;
        runQueuedImmediateCallbacks(checkCount?: number): void;
        setImmediate(callback: TimeOutCallback, ...args: any[]): number;
        clearImmediate(timeoutId: any): void;
        createDirectory(directoryName: string): void;
        writeFile(path: string, content: string): void;
        prependFile(path: string, content: string, options?: Partial<WatchInvokeOptions>): void;
        appendFile(path: string, content: string, options?: Partial<WatchInvokeOptions>): void;
        write(message: string): void;
        getOutput(): readonly string[];
        clearOutput(): void;
        serializeOutput(baseline: string[]): void;
        snap(): ESMap<Path, FSEntry>;
        writtenFiles?: ESMap<Path, number>;
        diff(baseline: string[], base?: ESMap<Path, FSEntry>): void;
        serializeWatches(baseline?: string[]): string[];
        realpath(s: string): string;
        readonly exitMessage = "System Exit";
        exitCode: number | undefined;
        readonly resolvePath: (s: string) => string;
        readonly getExecutingFilePath: () => string;
        readonly getCurrentDirectory: () => string;
        exit(exitCode?: number): void;
        getEnvironmentVariable(name: string): string;
    }
    export type TestServerHostTrackingWrittenFiles = TestServerHost & {
        writtenFiles: ESMap<Path, number>;
    };
    export function changeToHostTrackingWrittenFiles(inputHost: TestServerHost): TestServerHostTrackingWrittenFiles;
    export const tsbuildProjectsLocation = "/user/username/projects";
    export function getTsBuildProjectFilePath(project: string, file: string): string;
    export function getTsBuildProjectFile(project: string, file: string): File;
    export {};
}
declare namespace FourSlash {
    import ArrayOrSingle = FourSlashInterface.ArrayOrSingle;
    export const enum FourSlashTestType {
        Native = 0,
        Shims = 1,
        ShimsWithPreprocess = 2,
        Server = 3
    }
    interface FourSlashFile {
        content: string;
        fileName: string;
        symlinks?: string[];
        version: number;
        fileOptions: Harness.TestCaseParser.CompilerSettings;
    }
    interface FourSlashData {
        globalOptions: Harness.TestCaseParser.CompilerSettings;
        files: FourSlashFile[];
        symlinks: vfs.FileSet | undefined;
        markerPositions: ts.ESMap<string, Marker>;
        markers: Marker[];
        /**
         * Inserted in source files by surrounding desired text
         * in a range with `[|` and `|]`. For example,
         *
         * [|text in range|]
         *
         * is a range with `text in range` "selected".
         */
        ranges: Range[];
        rangesByText?: ts.MultiMap<string, Range>;
    }
    export interface Marker {
        fileName: string;
        position: number;
        data?: {};
    }
    export interface Range extends ts.TextRange {
        fileName: string;
        marker?: Marker;
    }
    export interface TextSpan {
        start: number;
        end: number;
    }
    export class TestCancellationToken implements ts.HostCancellationToken {
        private static readonly notCanceled;
        private numberOfCallsBeforeCancellation;
        isCancellationRequested(): boolean;
        setCancelled(numberOfCalls?: number): void;
        resetCancelled(): void;
    }
    export function verifyOperationIsCancelled(f: () => void): void;
    export function ignoreInterpolations(diagnostic: string | ts.DiagnosticMessage): FourSlashInterface.DiagnosticIgnoredInterpolations;
    export class TestState {
        private originalInputFileName;
        private basePath;
        private testType;
        testData: FourSlashData;
        private languageServiceAdapterHost;
        private languageService;
        private cancellationToken;
        private assertTextConsistent;
        currentCaretPosition: number;
        selectionEnd: number;
        lastKnownMarker: string | undefined;
        activeFile: FourSlashFile;
        enableFormatting: boolean;
        formatCodeSettings: ts.FormatCodeSettings;
        private inputFiles;
        private static getDisplayPartsJson;
        private addMatchedInputFile;
        private getLanguageServiceAdapter;
        constructor(originalInputFileName: string, basePath: string, testType: FourSlashTestType, testData: FourSlashData);
        private getFileContent;
        private tryGetFileContent;
        goToMarker(name?: string | Marker): void;
        goToEachMarker(markers: readonly Marker[], action: (marker: Marker, index: number) => void): void;
        goToEachRange(action: (range: Range) => void): void;
        markerName(m: Marker): string;
        goToPosition(positionOrLineAndCharacter: number | ts.LineAndCharacter): void;
        select(startMarker: string, endMarker: string): void;
        selectAllInFile(fileName: string): void;
        selectRange(range: Range): void;
        selectLine(index: number): void;
        moveCaretRight(count?: number): void;
        openFile(indexOrName: number | string, content?: string, scriptKindName?: string): void;
        verifyErrorExistsBetweenMarkers(startMarkerName: string, endMarkerName: string, shouldExist: boolean): void;
        verifyOrganizeImports(newContent: string, mode?: ts.OrganizeImportsMode): void;
        private raiseError;
        private messageAtLastKnownMarker;
        private assertionMessageAtLastKnownMarker;
        private getDiagnostics;
        private getAllDiagnostics;
        verifyErrorExistsAfterMarker(markerName: string, shouldExist: boolean, after: boolean): void;
        private anyErrorInRange;
        private printErrorLog;
        private formatRange;
        private formatLineAndCharacterOfPosition;
        private formatPosition;
        verifyNoErrors(): void;
        verifyErrorExistsAtRange(range: Range, code: number, expectedMessage?: string): void;
        verifyNumberOfErrorsInCurrentFile(expected: number): void;
        verifyEval(expr: string, value: any): void;
        verifyGoToDefinitionIs(endMarker: ArrayOrSingle<string>): void;
        verifyGoToDefinition(arg0: any, endMarkerNames?: ArrayOrSingle<string | {
            marker: string;
            unverified?: boolean;
        }> | {
            file: string;
            unverified?: boolean;
        }): void;
        verifyGoToSourceDefinition(startMarkerNames: ArrayOrSingle<string>, end?: ArrayOrSingle<string | {
            marker: string;
            unverified?: boolean;
        }> | {
            file: string;
            unverified?: boolean;
        }): void;
        private getGoToDefinition;
        private getGoToDefinitionAndBoundSpan;
        verifyGoToType(arg0: any, endMarkerNames?: ArrayOrSingle<string>): void;
        private verifyGoToX;
        private verifyGoToXPlain;
        verifyGoToDefinitionForMarkers(markerNames: string[]): void;
        private verifyGoToXSingle;
        private verifyGoToXWorker;
        private renderMarkers;
        private verifyDefinitionTextSpan;
        verifyGetEmitOutputForCurrentFile(expected: string): void;
        verifyGetEmitOutputContentsForCurrentFile(expected: ts.OutputFile[]): void;
        verifyInlayHints(expected: readonly FourSlashInterface.VerifyInlayHintsOptions[], span?: ts.TextSpan, preference?: ts.UserPreferences): void;
        verifyCompletions(options: FourSlashInterface.VerifyCompletionsOptions): void;
        private verifyCompletionsWorker;
        private verifyCompletionEntry;
        private verifyCompletionsAreExactly;
        /** Use `getProgram` instead of accessing this directly. */
        private _program;
        /** Use `getChecker` instead of accessing this directly. */
        private _checker;
        private getProgram;
        private getChecker;
        private getSourceFile;
        private getNode;
        private goToAndGetNode;
        private verifyRange;
        private verifySymbol;
        verifySymbolAtLocation(startRange: Range, declarationRanges: Range[]): void;
        symbolsInScope(range: Range): ts.Symbol[];
        setTypesRegistry(map: ts.MapLike<void>): void;
        verifyTypeOfSymbolAtLocation(range: Range, symbol: ts.Symbol, expected: string): void;
        verifyBaselineFindAllReferences(...markerNames: string[]): void;
        verifyBaselineFindAllReferencesMulti(seq: number, ...markerNames: string[]): void;
        private verifyBaselineFindAllReferencesWorker;
        verifyBaselineGetFileReferences(fileName: string): void;
        private getBaselineContentForGroupedReferences;
        private assertObjectsEqual;
        verifyDisplayPartsOfReferencedSymbol(expected: ts.SymbolDisplayPart[]): void;
        private configure;
        private getCompletionListAtCaret;
        private getCompletionEntryDetails;
        private findReferencesAtCaret;
        getSyntacticDiagnostics(expected: readonly FourSlashInterface.Diagnostic[]): void;
        getSemanticDiagnostics(expected: readonly FourSlashInterface.Diagnostic[]): void;
        getSuggestionDiagnostics(expected: readonly FourSlashInterface.Diagnostic[]): void;
        private testDiagnostics;
        verifyQuickInfoAt(markerName: string | Range, expectedText: string, expectedDocumentation?: string, expectedTags?: {
            name: string;
            text: string;
        }[]): void;
        verifyQuickInfos(namesAndTexts: {
            [name: string]: string | [string, string];
        }): void;
        verifyQuickInfoString(expectedText: string, expectedDocumentation?: string, expectedTags?: {
            name: string;
            text: string;
        }[]): void;
        verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: TextSpan, displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[] | undefined): void;
        verifyRangesAreRenameLocations(options?: Range[] | {
            findInStrings?: boolean;
            findInComments?: boolean;
            ranges?: Range[];
        }): void;
        verifyRenameLocations(startRanges: ArrayOrSingle<Range>, options: FourSlashInterface.RenameLocationsOptions): void;
        baselineRename(marker: string, options: FourSlashInterface.RenameOptions): void;
        verifyQuickInfoExists(negative: boolean): void;
        verifySignatureHelpPresence(expectPresent: boolean, triggerReason: ts.SignatureHelpTriggerReason | undefined, markers: readonly (string | Marker)[]): void;
        verifySignatureHelp(optionses: readonly FourSlashInterface.VerifySignatureHelpOptions[]): void;
        private verifySignatureHelpWorker;
        private validate;
        verifyRenameInfoSucceeded(displayName: string | undefined, fullDisplayName: string | undefined, kind: string | undefined, kindModifiers: string | undefined, fileToRename: string | undefined, expectedRange: Range | undefined, preferences: ts.UserPreferences | undefined): void;
        verifyRenameInfoFailed(message?: string, preferences?: ts.UserPreferences): void;
        private alignmentForExtraInfo;
        private spanLines;
        private spanInfoToString;
        private baselineCurrentFileLocations;
        getBreakpointStatementLocation(pos: number): ts.TextSpan | undefined;
        baselineCurrentFileBreakpointLocations(): void;
        private getEmitFiles;
        verifyGetEmitOutput(expectedOutputFiles: readonly string[]): void;
        baselineGetEmitOutput(): void;
        private flattenChainedMessage;
        baselineSyntacticDiagnostics(): void;
        private getCompilerTestFiles;
        baselineSyntacticAndSemanticDiagnostics(): void;
        private getSyntacticDiagnosticBaselineText;
        private getSemanticDiagnosticBaselineText;
        baselineQuickInfo(): void;
        baselineSignatureHelp(): void;
        baselineCompletions(preferences?: ts.UserPreferences): void;
        baselineSmartSelection(): void;
        printBreakpointLocation(pos: number): void;
        printBreakpointAtCurrentLocation(): void;
        printCurrentParameterHelp(): void;
        printCurrentQuickInfo(): void;
        printErrorList(): void;
        printCurrentFileState(showWhitespace: boolean, makeCaretVisible: boolean): void;
        printCurrentSignatureHelp(): void;
        private getBaselineFileNameForInternalFourslashFile;
        private getBaselineFileNameForContainingTestFile;
        private getSignatureHelp;
        printCompletionListMembers(preferences: ts.UserPreferences | undefined): void;
        private printMembersOrCompletions;
        printContext(): void;
        deleteChar(count?: number): void;
        replace(start: number, length: number, text: string): void;
        deleteLineRange(startIndex: number, endIndexInclusive: number): void;
        deleteCharBehindMarker(count?: number): void;
        type(text: string, highFidelity?: boolean): void;
        paste(text: string): void;
        private checkPostEditInvariants;
        /**
         * @returns The number of characters added to the file as a result of the edits.
         * May be negative.
         */
        private applyEdits;
        copyFormatOptions(): ts.FormatCodeSettings;
        setFormatOptions(formatCodeOptions: ts.FormatCodeOptions | ts.FormatCodeSettings): ts.FormatCodeSettings;
        formatDocument(): void;
        formatSelection(start: number, end: number): void;
        formatOnType(pos: number, key: string): void;
        private editScriptAndUpdateMarkers;
        private removeWhitespace;
        goToBOF(): void;
        goToEOF(): void;
        goToRangeStart({ fileName, pos }: Range): void;
        goToTypeDefinition(definitionIndex: number): void;
        verifyTypeDefinitionsCount(negative: boolean, expectedCount: number): void;
        verifyImplementationListIsEmpty(negative: boolean): void;
        verifyGoToDefinitionName(expectedName: string, expectedContainerName: string): void;
        goToImplementation(): void;
        verifyRangesInImplementationList(markerName: string): void;
        getMarkers(): Marker[];
        getMarkerNames(): string[];
        getRanges(): Range[];
        getRangesInFile(fileName?: string): Range[];
        rangesByText(): ts.ESMap<string, Range[]>;
        private rangeText;
        verifyCaretAtMarker(markerName?: string): void;
        private getIndentation;
        verifyIndentationAtCurrentPosition(numberOfSpaces: number, indentStyle?: ts.IndentStyle, baseIndentSize?: number): void;
        verifyIndentationAtPosition(fileName: string, position: number, numberOfSpaces: number, indentStyle?: ts.IndentStyle, baseIndentSize?: number): void;
        verifyCurrentLineContent(text: string): void;
        verifyCurrentFileContent(text: string): void;
        private verifyFileContent;
        verifyFormatDocumentChangesNothing(): void;
        verifyTextAtCaretIs(text: string): void;
        verifyCurrentNameOrDottedNameSpanText(text: string): undefined;
        private getNameOrDottedNameSpan;
        baselineCurrentFileNameOrDottedNameSpans(): void;
        printNameOrDottedNameSpans(pos: number): void;
        private classificationToIdentifier;
        private verifyClassifications;
        verifyProjectInfo(expected: string[]): void;
        replaceWithSemanticClassifications(format: ts.SemanticClassificationFormat.TwentyTwenty): void;
        verifyEncodedSyntacticClassificationsLength(expected: number): void;
        verifyEncodedSemanticClassificationsLength(format: ts.SemanticClassificationFormat, expected: number): void;
        verifySemanticClassifications(format: ts.SemanticClassificationFormat, expected: {
            classificationType: string | number;
            text?: string;
        }[]): void;
        verifySyntacticClassifications(expected: {
            classificationType: string;
            text: string;
        }[]): void;
        printOutliningSpans(): void;
        private printOutliningSpansInline;
        verifyOutliningSpans(spans: Range[], kind?: "comment" | "region" | "code" | "imports"): void;
        verifyOutliningHintSpans(spans: Range[]): void;
        verifyTodoComments(descriptors: string[], spans: Range[]): void;
        /**
         * Finds and applies a code action corresponding to the supplied parameters.
         * If index is undefined, applies the unique code action available.
         * @param errorCode The error code that generated the code action.
         * @param index The nth (0-index-based) codeaction available generated by errorCode.
         */
        getAndApplyCodeActions(errorCode?: number, index?: number): void;
        applyCodeActionFromCompletion(markerName: string, options: FourSlashInterface.VerifyCompletionActionOptions): undefined;
        verifyRangeIs(expectedText: string, includeWhiteSpace?: boolean): void;
        private getOnlyRange;
        private verifyTextMatches;
        /**
         * Compares expected text to the text that would be in the sole range
         * (ie: [|...|]) in the file after applying the codefix sole codefix
         * in the source file.
         */
        verifyRangeAfterCodeFix(expectedText: string, includeWhiteSpace?: boolean, errorCode?: number, index?: number): void;
        verifyCodeFixAll({ fixId, fixAllDescription, newFileContent, commands: expectedCommands }: FourSlashInterface.VerifyCodeFixAllOptions): void;
        verifyCodeFix(options: FourSlashInterface.VerifyCodeFixOptions): void;
        private verifyNewContent;
        private verifyNewContentAfterChange;
        /**
         * Rerieves a codefix satisfying the parameters, or undefined if no such codefix is found.
         * @param fileName Path to file where error should be retrieved from.
         */
        private getCodeFixes;
        private applyChanges;
        verifyImportFixAtPosition(expectedTextArray: string[], errorCode: number | undefined, preferences: ts.UserPreferences | undefined): void;
        verifyImportFixModuleSpecifiers(markerName: string, moduleSpecifiers: string[], preferences?: ts.UserPreferences): void;
        verifyDocCommentTemplate(expected: ts.TextInsertion | undefined, options?: ts.DocCommentTemplateOptions): void;
        verifyBraceCompletionAtPosition(negative: boolean, openingBrace: string): void;
        verifyJsxClosingTag(map: {
            [markerName: string]: ts.JsxClosingTagInfo | undefined;
        }): void;
        verifyMatchingBracePosition(bracePosition: number, expectedMatchPosition: number): void;
        verifyNoMatchingBracePosition(bracePosition: number): void;
        verifySpanOfEnclosingComment(negative: boolean, onlyMultiLineDiverges?: boolean): void;
        verifyNavigateTo(options: readonly FourSlashInterface.VerifyNavigateToOptions[]): void;
        verifyNavigationBar(json: any, options: {
            checkSpans?: boolean;
        } | undefined): void;
        verifyNavigationTree(json: any, options: {
            checkSpans?: boolean;
        } | undefined): void;
        private verifyNavigationTreeOrBar;
        printNavigationItems(searchValue: string): void;
        printNavigationBar(): void;
        private getOccurrencesAtCurrentPosition;
        verifyOccurrencesAtPositionListContains(fileName: string, start: number, end: number, isWriteAccess?: boolean): undefined;
        verifyOccurrencesAtPositionListCount(expectedCount: number): void;
        private getDocumentHighlightsAtCurrentPosition;
        verifyRangesAreOccurrences(isWriteAccess?: boolean, ranges?: Range[]): void;
        verifyRangesWithSameTextAreRenameLocations(...texts: string[]): void;
        verifyRangesWithSameTextAreDocumentHighlights(): void;
        verifyDocumentHighlightsOf(startRange: Range, ranges: Range[], options: FourSlashInterface.VerifyDocumentHighlightsOptions | undefined): void;
        verifyRangesAreDocumentHighlights(ranges: Range[] | undefined, options: FourSlashInterface.VerifyDocumentHighlightsOptions | undefined): void;
        verifyNoDocumentHighlights(startRange: Range): void;
        private verifyDocumentHighlights;
        verifyCodeFixAvailable(negative: boolean, expected: FourSlashInterface.VerifyCodeFixAvailableOptions[] | string | undefined): void;
        verifyCodeFixAllAvailable(negative: boolean, fixName: string): void;
        verifyApplicableRefactorAvailableAtMarker(negative: boolean, markerName: string): void;
        private getSelection;
        verifyRefactorAvailable(negative: boolean, triggerReason: ts.RefactorTriggerReason, name: string, actionName?: string, actionDescription?: string): void;
        verifyRefactorKindsAvailable(kind: string, expected: string[], preferences?: {}): void;
        verifyRefactorsAvailable(names: readonly string[]): void;
        verifyApplicableRefactorAvailableForRange(negative: boolean): void;
        applyRefactor({ refactorName, actionName, actionDescription, newContent: newContentWithRenameMarker, triggerReason }: FourSlashInterface.ApplyRefactorOptions): void;
        private static parseNewContent;
        noMoveToNewFile(): void;
        moveToNewFile(options: FourSlashInterface.MoveToNewFileOptions): void;
        private testNewFileContents;
        verifyFileAfterApplyingRefactorAtMarker(markerName: string, expectedContent: string, refactorNameToApply: string, actionName: string, formattingOptions?: ts.FormatCodeSettings): void;
        printAvailableCodeFixes(): void;
        private formatCallHierarchyItemSpan;
        private formatCallHierarchyItemSpans;
        private formatCallHierarchyItem;
        private formatCallHierarchy;
        baselineCallHierarchy(): void;
        private assertTextSpanEqualsRange;
        private getLineContent;
        private getCurrentLineContent;
        private findFile;
        private tryFindFileWorker;
        private hasFile;
        private getLineColStringAtPosition;
        getMarkerByName(markerName: string): Marker;
        setCancelled(numberOfCalls: number): void;
        resetCancelled(): void;
        getEditsForFileRename({ oldPath, newPath, newFileContents, preferences }: FourSlashInterface.GetEditsForFileRenameOptions): void;
        private getApplicableRefactorsAtSelection;
        private getApplicableRefactors;
        private getApplicableRefactorsWorker;
        configurePlugin(pluginName: string, configuration: any): void;
        setCompilerOptionsForInferredProjects(options: ts.server.protocol.CompilerOptions): void;
        toggleLineComment(newFileContent: string): void;
        toggleMultilineComment(newFileContent: string): void;
        commentSelection(newFileContent: string): void;
        uncommentSelection(newFileContent: string): void;
    }
    export function runFourSlashTest(basePath: string, testType: FourSlashTestType, fileName: string): void;
    export function runFourSlashTestContent(basePath: string, testType: FourSlashTestType, content: string, fileName: string): void;
    export {};
}
declare namespace FourSlashInterface {
    export class Test {
        private state;
        constructor(state: FourSlash.TestState);
        markers(): FourSlash.Marker[];
        markerNames(): string[];
        marker(name: string): FourSlash.Marker;
        markerName(m: FourSlash.Marker): string;
        ranges(): FourSlash.Range[];
        rangesInFile(fileName?: string): FourSlash.Range[];
        spans(): ts.TextSpan[];
        rangesByText(): ts.ESMap<string, FourSlash.Range[]>;
        markerByName(s: string): FourSlash.Marker;
        symbolsInScope(range: FourSlash.Range): ts.Symbol[];
        setTypesRegistry(map: ts.MapLike<void>): void;
    }
    export class Config {
        private state;
        constructor(state: FourSlash.TestState);
        configurePlugin(pluginName: string, configuration: any): void;
        setCompilerOptionsForInferredProjects(options: ts.server.protocol.CompilerOptions): void;
    }
    export class GoTo {
        private state;
        constructor(state: FourSlash.TestState);
        marker(name?: string | FourSlash.Marker): void;
        eachMarker(markers: readonly string[], action: (marker: FourSlash.Marker, index: number) => void): void;
        eachMarker(action: (marker: FourSlash.Marker, index: number) => void): void;
        rangeStart(range: FourSlash.Range): void;
        eachRange(action: (range: FourSlash.Range) => void): void;
        bof(): void;
        eof(): void;
        implementation(): void;
        position(positionOrLineAndCharacter: number | ts.LineAndCharacter, fileNameOrIndex?: string | number): void;
        file(indexOrName: number | string, content?: string, scriptKindName?: string): void;
        select(startMarker: string, endMarker: string): void;
        selectAllInFile(fileName: string): void;
        selectRange(range: FourSlash.Range): void;
    }
    export class VerifyNegatable {
        protected state: FourSlash.TestState;
        private negative;
        not: VerifyNegatable | undefined;
        constructor(state: FourSlash.TestState, negative?: boolean);
        assertHasRanges(ranges: FourSlash.Range[]): void;
        noSignatureHelp(...markers: (string | FourSlash.Marker)[]): void;
        noSignatureHelpForTriggerReason(reason: ts.SignatureHelpTriggerReason, ...markers: (string | FourSlash.Marker)[]): void;
        signatureHelpPresentForTriggerReason(reason: ts.SignatureHelpTriggerReason, ...markers: (string | FourSlash.Marker)[]): void;
        signatureHelp(...options: VerifySignatureHelpOptions[]): void;
        errorExistsBetweenMarkers(startMarker: string, endMarker: string): void;
        errorExistsAfterMarker(markerName?: string): void;
        errorExistsBeforeMarker(markerName?: string): void;
        quickInfoExists(): void;
        typeDefinitionCountIs(expectedCount: number): void;
        implementationListIsEmpty(): void;
        isValidBraceCompletionAtPosition(openingBrace: string): void;
        jsxClosingTag(map: {
            [markerName: string]: ts.JsxClosingTagInfo | undefined;
        }): void;
        isInCommentAtPosition(onlyMultiLineDiverges?: boolean): void;
        codeFix(options: VerifyCodeFixOptions): void;
        codeFixAvailable(options?: VerifyCodeFixAvailableOptions[]): void;
        codeFixAllAvailable(fixName: string): void;
        applicableRefactorAvailableAtMarker(markerName: string): void;
        applicableRefactorAvailableForRange(): void;
        refactorsAvailable(names: readonly string[]): void;
        refactorAvailable(name: string, actionName?: string, actionDescription?: string): void;
        refactorAvailableForTriggerReason(triggerReason: ts.RefactorTriggerReason, name: string, actionName?: string): void;
        refactorKindAvailable(kind: string, expected: string[], preferences?: {}): void;
        toggleLineComment(newFileContent: string): void;
        toggleMultilineComment(newFileContent: string): void;
        commentSelection(newFileContent: string): void;
        uncommentSelection(newFileContent: string): void;
    }
    export class Verify extends VerifyNegatable {
        constructor(state: FourSlash.TestState);
        completions(...optionsArray: VerifyCompletionsOptions[]): void;
        getInlayHints(expected: readonly VerifyInlayHintsOptions[], span: ts.TextSpan, preference?: ts.UserPreferences): void;
        quickInfoIs(expectedText: string, expectedDocumentation?: string, expectedTags?: {
            name: string;
            text: string;
        }[]): void;
        quickInfoAt(markerName: string | FourSlash.Range, expectedText: string, expectedDocumentation?: string, expectedTags?: {
            name: string;
            text: string;
        }[]): void;
        quickInfos(namesAndTexts: {
            [name: string]: string;
        }): void;
        caretAtMarker(markerName?: string): void;
        indentationIs(numberOfSpaces: number): void;
        indentationAtPositionIs(fileName: string, position: number, numberOfSpaces: number, indentStyle?: ts.IndentStyle, baseIndentSize?: number): void;
        textAtCaretIs(text: string): void;
        /**
         * Compiles the current file and evaluates 'expr' in a context containing
         * the emitted output, then compares (using ===) the result of that expression
         * to 'value'. Do not use this function with external modules as it is not supported.
         */
        eval(expr: string, value: any): void;
        currentLineContentIs(text: string): void;
        currentFileContentIs(text: string): void;
        formatDocumentChangesNothing(): void;
        goToDefinitionIs(endMarkers: ArrayOrSingle<string>): void;
        goToDefinition(startMarkerName: ArrayOrSingle<string>, endMarkerName: ArrayOrSingle<string>, range?: FourSlash.Range): void;
        goToDefinition(startsAndEnds: [ArrayOrSingle<string>, ArrayOrSingle<string>][] | {
            [startMarkerName: string]: ArrayOrSingle<string>;
        }): void;
        goToType(startMarkerName: ArrayOrSingle<string>, endMarkerName: ArrayOrSingle<string>): void;
        goToType(startsAndEnds: [ArrayOrSingle<string>, ArrayOrSingle<string>][] | {
            [startMarkerName: string]: ArrayOrSingle<string>;
        }): void;
        goToSourceDefinition(startMarkerNames: ArrayOrSingle<string>, end: {
            file: string;
        } | ArrayOrSingle<string>): void;
        goToDefinitionForMarkers(...markerNames: string[]): void;
        goToDefinitionName(name: string, containerName: string): void;
        verifyGetEmitOutputForCurrentFile(expected: string): void;
        verifyGetEmitOutputContentsForCurrentFile(expected: ts.OutputFile[]): void;
        symbolAtLocation(startRange: FourSlash.Range, ...declarationRanges: FourSlash.Range[]): void;
        typeOfSymbolAtLocation(range: FourSlash.Range, symbol: ts.Symbol, expected: string): void;
        baselineFindAllReferences(...markerNames: string[]): void;
        baselineFindAllReferencesMulti(seq: number, ...markerNames: string[]): void;
        baselineGetFileReferences(fileName: string): void;
        findReferencesDefinitionDisplayPartsAtCaretAre(expected: ts.SymbolDisplayPart[]): void;
        noErrors(): void;
        errorExistsAtRange(range: FourSlash.Range, code: number, message?: string): void;
        numberOfErrorsInCurrentFile(expected: number): void;
        baselineCurrentFileBreakpointLocations(): void;
        baselineCurrentFileNameOrDottedNameSpans(): void;
        getEmitOutput(expectedOutputFiles: readonly string[]): void;
        baselineGetEmitOutput(): void;
        baselineQuickInfo(): void;
        baselineSignatureHelp(): void;
        baselineCompletions(preferences?: ts.UserPreferences): void;
        baselineSmartSelection(): void;
        baselineSyntacticDiagnostics(): void;
        baselineSyntacticAndSemanticDiagnostics(): void;
        nameOrDottedNameSpanTextIs(text: string): void;
        outliningSpansInCurrentFile(spans: FourSlash.Range[], kind?: "comment" | "region" | "code" | "imports"): void;
        outliningHintSpansInCurrentFile(spans: FourSlash.Range[]): void;
        todoCommentsInCurrentFile(descriptors: string[]): void;
        matchingBracePositionInCurrentFile(bracePosition: number, expectedMatchPosition: number): void;
        noMatchingBracePositionInCurrentFile(bracePosition: number): void;
        docCommentTemplateAt(marker: string | FourSlash.Marker, expectedOffset: number, expectedText: string, options?: ts.DocCommentTemplateOptions): void;
        noDocCommentTemplateAt(marker: string | FourSlash.Marker): void;
        rangeAfterCodeFix(expectedText: string, includeWhiteSpace?: boolean, errorCode?: number, index?: number): void;
        codeFixAll(options: VerifyCodeFixAllOptions): void;
        fileAfterApplyingRefactorAtMarker(markerName: string, expectedContent: string, refactorNameToApply: string, actionName: string, formattingOptions?: ts.FormatCodeSettings): void;
        rangeIs(expectedText: string, includeWhiteSpace?: boolean): void;
        getAndApplyCodeFix(errorCode?: number, index?: number): void;
        applyCodeActionFromCompletion(markerName: string, options: VerifyCompletionActionOptions): void;
        importFixAtPosition(expectedTextArray: string[], errorCode?: number, preferences?: ts.UserPreferences): void;
        importFixModuleSpecifiers(marker: string, moduleSpecifiers: string[], preferences?: ts.UserPreferences): void;
        navigationBar(json: any, options?: {
            checkSpans?: boolean;
        }): void;
        navigationTree(json: any, options?: {
            checkSpans?: boolean;
        }): void;
        navigateTo(...options: VerifyNavigateToOptions[]): void;
        occurrencesAtPositionContains(range: FourSlash.Range, isWriteAccess?: boolean): void;
        occurrencesAtPositionCount(expectedCount: number): void;
        rangesAreOccurrences(isWriteAccess?: boolean, ranges?: FourSlash.Range[]): void;
        rangesWithSameTextAreRenameLocations(...texts: string[]): void;
        rangesAreRenameLocations(options?: FourSlash.Range[] | {
            findInStrings?: boolean;
            findInComments?: boolean;
            ranges?: FourSlash.Range[];
            providePrefixAndSuffixTextForRename?: boolean;
        }): void;
        rangesAreDocumentHighlights(ranges?: FourSlash.Range[], options?: VerifyDocumentHighlightsOptions): void;
        rangesWithSameTextAreDocumentHighlights(): void;
        documentHighlightsOf(startRange: FourSlash.Range, ranges: FourSlash.Range[], options?: VerifyDocumentHighlightsOptions): void;
        noDocumentHighlights(startRange: FourSlash.Range): void;
        /**
         * This method *requires* a contiguous, complete, and ordered stream of classifications for a file.
         */
        syntacticClassificationsAre(...classifications: {
            classificationType: string;
            text: string;
        }[]): void;
        encodedSyntacticClassificationsLength(length: number): void;
        encodedSemanticClassificationsLength(format: ts.SemanticClassificationFormat, length: number): void;
        /**
         * This method *requires* an ordered stream of classifications for a file, and spans are highly recommended.
         */
        semanticClassificationsAre(format: ts.SemanticClassificationFormat, ...classifications: Classification[]): void;
        replaceWithSemanticClassifications(format: ts.SemanticClassificationFormat.TwentyTwenty): void;
        renameInfoSucceeded(displayName?: string, fullDisplayName?: string, kind?: string, kindModifiers?: string, fileToRename?: string, expectedRange?: FourSlash.Range, preferences?: ts.UserPreferences): void;
        renameInfoFailed(message?: string, preferences?: ts.UserPreferences): void;
        renameLocations(startRanges: ArrayOrSingle<FourSlash.Range>, options: RenameLocationsOptions): void;
        baselineRename(marker: string, options: RenameOptions): void;
        verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: FourSlash.TextSpan, displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[]): void;
        getSyntacticDiagnostics(expected: readonly Diagnostic[]): void;
        getSemanticDiagnostics(expected: readonly Diagnostic[]): void;
        getSuggestionDiagnostics(expected: readonly Diagnostic[]): void;
        ProjectInfo(expected: string[]): void;
        allRangesAppearInImplementationList(markerName: string): void;
        getEditsForFileRename(options: GetEditsForFileRenameOptions): void;
        baselineCallHierarchy(): void;
        moveToNewFile(options: MoveToNewFileOptions): void;
        noMoveToNewFile(): void;
        organizeImports(newContent: string, mode?: ts.OrganizeImportsMode): void;
    }
    export class Edit {
        private state;
        constructor(state: FourSlash.TestState);
        backspace(count?: number): void;
        deleteAtCaret(times?: number): void;
        replace(start: number, length: number, text: string): void;
        paste(text: string): void;
        insert(text: string): void;
        insertLine(text: string): void;
        insertLines(...lines: string[]): void;
        deleteLine(index: number): void;
        deleteLineRange(startIndex: number, endIndexInclusive: number): void;
        replaceLine(index: number, text: string): void;
        moveRight(count?: number): void;
        moveLeft(count?: number): void;
        enableFormatting(): void;
        disableFormatting(): void;
        applyRefactor(options: ApplyRefactorOptions): void;
    }
    export class Debug {
        private state;
        constructor(state: FourSlash.TestState);
        printCurrentParameterHelp(): void;
        printCurrentFileState(): void;
        printCurrentFileStateWithWhitespace(): void;
        printCurrentFileStateWithoutCaret(): void;
        printCurrentQuickInfo(): void;
        printCurrentSignatureHelp(): void;
        printCompletionListMembers(options: ts.UserPreferences | undefined): void;
        printAvailableCodeFixes(): void;
        printBreakpointLocation(pos: number): void;
        printBreakpointAtCurrentLocation(): void;
        printNameOrDottedNameSpans(pos: number): void;
        printErrorList(): void;
        printNavigationItems(searchValue?: string): void;
        printNavigationBar(): void;
        printContext(): void;
        printOutliningSpans(): void;
    }
    export class Format {
        private state;
        constructor(state: FourSlash.TestState);
        document(): void;
        copyFormatOptions(): ts.FormatCodeSettings;
        setFormatOptions(options: ts.FormatCodeOptions): ts.FormatCodeSettings;
        selection(startMarker: string, endMarker: string): void;
        onType(posMarker: string, key: string): void;
        setOption(name: keyof ts.FormatCodeSettings, value: number | string | boolean): void;
    }
    export class Cancellation {
        private state;
        constructor(state: FourSlash.TestState);
        resetCancelled(): void;
        setCancelled(numberOfCalls?: number): void;
    }
    interface OlderClassification {
        classificationType: ts.ClassificationTypeNames;
        text: string;
        textSpan?: FourSlash.TextSpan;
    }
    interface ModernClassification {
        classificationType: string;
        text?: string;
        textSpan?: FourSlash.TextSpan;
    }
    type Classification = OlderClassification | ModernClassification;
    export function classification(format: ts.SemanticClassificationFormat): {
        semanticToken: (identifier: string, text: string, _position: number) => Classification;
        comment?: undefined;
        identifier?: undefined;
        keyword?: undefined;
        numericLiteral?: undefined;
        operator?: undefined;
        stringLiteral?: undefined;
        whiteSpace?: undefined;
        text?: undefined;
        punctuation?: undefined;
        docCommentTagName?: undefined;
        className?: undefined;
        enumName?: undefined;
        interfaceName?: undefined;
        moduleName?: undefined;
        typeParameterName?: undefined;
        parameterName?: undefined;
        typeAliasName?: undefined;
        jsxOpenTagName?: undefined;
        jsxCloseTagName?: undefined;
        jsxSelfClosingTagName?: undefined;
        jsxAttribute?: undefined;
        jsxText?: undefined;
        jsxAttributeStringLiteralValue?: undefined;
        getClassification?: undefined;
    } | {
        comment: (text: string, position?: number) => Classification;
        identifier: (text: string, position?: number) => Classification;
        keyword: (text: string, position?: number) => Classification;
        numericLiteral: (text: string, position?: number) => Classification;
        operator: (text: string, position?: number) => Classification;
        stringLiteral: (text: string, position?: number) => Classification;
        whiteSpace: (text: string, position?: number) => Classification;
        text: (text: string, position?: number) => Classification;
        punctuation: (text: string, position?: number) => Classification;
        docCommentTagName: (text: string, position?: number) => Classification;
        className: (text: string, position?: number) => Classification;
        enumName: (text: string, position?: number) => Classification;
        interfaceName: (text: string, position?: number) => Classification;
        moduleName: (text: string, position?: number) => Classification;
        typeParameterName: (text: string, position?: number) => Classification;
        parameterName: (text: string, position?: number) => Classification;
        typeAliasName: (text: string, position?: number) => Classification;
        jsxOpenTagName: (text: string, position?: number) => Classification;
        jsxCloseTagName: (text: string, position?: number) => Classification;
        jsxSelfClosingTagName: (text: string, position?: number) => Classification;
        jsxAttribute: (text: string, position?: number) => Classification;
        jsxText: (text: string, position?: number) => Classification;
        jsxAttributeStringLiteralValue: (text: string, position?: number) => Classification;
        getClassification: (classificationType: ts.ClassificationTypeNames, text: string, position?: number) => Classification;
        semanticToken?: undefined;
    };
    export namespace Completion {
        import SortTextType = ts.Completions.SortText;
        type SortText = SortTextType;
        export import CompletionSource = ts.Completions.CompletionSource;
        const SortText: {
            LocalDeclarationPriority: SortTextType;
            LocationPriority: SortTextType;
            OptionalMember: SortTextType;
            MemberDeclaredBySpreadAssignment: SortTextType;
            SuggestedClassMembers: SortTextType;
            GlobalsOrKeywords: SortTextType;
            AutoImportSuggestions: SortTextType;
            ClassMemberSnippets: SortTextType;
            JavascriptIdentifiers: SortTextType;
            Deprecated(sortText: SortText): SortText;
            ObjectLiteralProperty(presetSortText: SortText, symbolDisplayName: string): SortText;
            SortBelow(sortText: SortText): SortText;
        };
        const keywordsWithUndefined: readonly ExpectedCompletionEntryObject[];
        const keywords: readonly ExpectedCompletionEntryObject[];
        const typeKeywords: readonly ExpectedCompletionEntryObject[];
        function sorted(entries: readonly ExpectedCompletionEntry[]): readonly ExpectedCompletionEntry[];
        function typeKeywordsPlus(plus: readonly ExpectedCompletionEntry[]): ExpectedExactCompletionsPlus;
        const globalThisEntry: ExpectedCompletionEntry;
        const globalTypes: ExpectedExactCompletionsPlus;
        function globalTypesPlus(plus: readonly ExpectedCompletionEntry[]): ExpectedExactCompletionsPlus;
        const typeAssertionKeywords: readonly ExpectedCompletionEntry[];
        const classElementKeywords: readonly ExpectedCompletionEntryObject[];
        const classElementInJsKeywords: readonly ExpectedCompletionEntryObject[];
        const constructorParameterKeywords: readonly ExpectedCompletionEntryObject[];
        const functionMembers: readonly ExpectedCompletionEntryObject[];
        function functionMembersPlus(plus: readonly ExpectedCompletionEntryObject[]): ExpectedExactCompletionsPlus;
        const stringMembers: readonly ExpectedCompletionEntryObject[];
        const functionMembersWithPrototype: readonly ExpectedCompletionEntryObject[];
        function functionMembersWithPrototypePlus(plus: readonly ExpectedCompletionEntryObject[]): ExpectedCompletionEntryObject[];
        const statementKeywordsWithTypes: readonly ExpectedCompletionEntryObject[];
        const statementKeywords: readonly ExpectedCompletionEntryObject[];
        const statementInJsKeywords: readonly ExpectedCompletionEntryObject[];
        const globalsVars: readonly ExpectedCompletionEntryObject[];
        const undefinedVarEntry: ExpectedCompletionEntryObject;
        const globalsInsideFunction: (plus: readonly ExpectedCompletionEntry[], options?: {
            noLib?: boolean;
        }) => readonly ExpectedCompletionEntry[];
        const globalsInJsInsideFunction: (plus: readonly ExpectedCompletionEntry[], options?: {
            noLib?: boolean;
        }) => readonly ExpectedCompletionEntry[];
        const globalKeywords: readonly ExpectedCompletionEntryObject[];
        const globalInJsKeywords: readonly ExpectedCompletionEntryObject[];
        const insideMethodKeywords: readonly ExpectedCompletionEntryObject[];
        const insideMethodInJsKeywords: readonly ExpectedCompletionEntryObject[];
        const globals: readonly ExpectedCompletionEntryObject[];
        const globalsInJs: readonly ExpectedCompletionEntryObject[];
        function globalsPlus(plus: readonly ExpectedCompletionEntry[], options?: {
            noLib?: boolean;
        }): ExpectedExactCompletionsPlus;
        function globalsInJsPlus(plus: readonly ExpectedCompletionEntry[], options?: {
            noLib?: boolean;
        }): ExpectedExactCompletionsPlus;
    }
    export interface ReferenceGroup {
        definition: ReferenceGroupDefinition;
        ranges: FourSlash.Range[];
    }
    export type ReferenceGroupDefinition = string | {
        text: string;
        range: FourSlash.Range;
    };
    export interface ApplyRefactorOptions {
        refactorName: string;
        actionName: string;
        actionDescription: string;
        newContent: NewFileContent;
        triggerReason?: ts.RefactorTriggerReason;
    }
    export type ExpectedCompletionEntry = string | ExpectedCompletionEntryObject;
    export interface ExpectedCompletionEntryObject {
        readonly name: string;
        readonly source?: string;
        readonly insertText?: string;
        readonly replacementSpan?: FourSlash.Range;
        readonly hasAction?: boolean;
        readonly isRecommended?: boolean;
        readonly isFromUncheckedFile?: boolean;
        readonly kind?: string;
        readonly isPackageJsonImport?: boolean;
        readonly isSnippet?: boolean;
        readonly kindModifiers?: string;
        readonly text?: string;
        readonly documentation?: string;
        readonly sourceDisplay?: string;
        readonly labelDetails?: ExpectedCompletionEntryLabelDetails;
        readonly tags?: readonly ts.JSDocTagInfo[];
        readonly sortText?: ts.Completions.SortText;
    }
    export interface ExpectedCompletionEntryLabelDetails {
        detail?: string;
        description?: string;
    }
    export type ExpectedExactCompletionsPlus = readonly ExpectedCompletionEntry[] & {
        plusFunctionName: string;
        plusArgument: readonly ExpectedCompletionEntry[];
    };
    export interface VerifyCompletionsOptions {
        readonly marker?: ArrayOrSingle<string | FourSlash.Marker>;
        readonly isNewIdentifierLocation?: boolean;
        readonly isGlobalCompletion?: boolean;
        readonly optionalReplacementSpan?: FourSlash.Range;
        readonly exact?: ArrayOrSingle<ExpectedCompletionEntry> | ExpectedExactCompletionsPlus;
        readonly unsorted?: readonly ExpectedCompletionEntry[];
        readonly includes?: ArrayOrSingle<ExpectedCompletionEntry>;
        readonly excludes?: ArrayOrSingle<string>;
        readonly preferences?: ts.UserPreferences;
        readonly triggerCharacter?: ts.CompletionsTriggerCharacter;
    }
    export interface VerifySignatureHelpOptions {
        readonly marker?: ArrayOrSingle<string | FourSlash.Marker>;
        /** @default 1 */
        readonly overloadsCount?: number;
        /** @default undefined */
        readonly docComment?: string;
        readonly text?: string;
        readonly parameterName?: string;
        readonly parameterSpan?: string;
        /** @default undefined */
        readonly parameterDocComment?: string;
        readonly parameterCount?: number;
        readonly argumentCount?: number;
        /** @default false */
        readonly isVariadic?: boolean;
        /** @default ts.emptyArray */
        readonly tags?: readonly ts.JSDocTagInfo[];
        readonly triggerReason?: ts.SignatureHelpTriggerReason;
        readonly overrideSelectedItemIndex?: number;
    }
    export interface VerifyNavigateToOptions {
        readonly pattern: string;
        readonly fileName?: string;
        readonly expected: readonly ExpectedNavigateToItem[];
    }
    export interface ExpectedNavigateToItem {
        readonly name: string;
        readonly kind: ts.ScriptElementKind;
        readonly kindModifiers?: string;
        readonly matchKind?: keyof typeof ts.PatternMatchKind;
        readonly isCaseSensitive?: boolean;
        readonly range: FourSlash.Range;
        readonly containerName?: string;
        readonly containerKind?: ts.ScriptElementKind;
    }
    export interface VerifyInlayHintsOptions {
        text: string;
        position: number;
        kind?: ts.InlayHintKind;
        whitespaceBefore?: boolean;
        whitespaceAfter?: boolean;
    }
    export type ArrayOrSingle<T> = T | readonly T[];
    export interface VerifyCompletionListContainsOptions extends ts.UserPreferences {
        triggerCharacter?: ts.CompletionsTriggerCharacter;
        sourceDisplay: string;
        isRecommended?: true;
        insertText?: string;
        replacementSpan?: FourSlash.Range;
    }
    export interface VerifyDocumentHighlightsOptions {
        filesToSearch?: readonly string[];
    }
    export type NewFileContent = string | {
        readonly [filename: string]: string;
    };
    export interface NewContentOptions {
        newFileContent?: NewFileContent;
        newRangeContent?: string;
    }
    export interface VerifyCodeFixOptions extends NewContentOptions {
        readonly description: string | [string, ...(string | number)[]] | DiagnosticIgnoredInterpolations;
        readonly errorCode?: number;
        readonly index?: number;
        readonly preferences?: ts.UserPreferences;
        readonly applyChanges?: boolean;
        readonly commands?: readonly ts.CodeActionCommand[];
    }
    export interface VerifyCodeFixAvailableOptions {
        description: string;
        commands?: ts.CodeActionCommand[];
    }
    export interface VerifyCodeFixAllOptions {
        fixId: string;
        fixAllDescription: string;
        newFileContent: NewFileContent;
        commands: readonly {}[];
    }
    export interface VerifyRefactorOptions {
        name: string;
        actionName: string;
        refactors: readonly ts.ApplicableRefactorInfo[];
    }
    export interface VerifyCompletionActionOptions extends NewContentOptions {
        name: string;
        source?: string;
        data?: ts.CompletionEntryData;
        description: string;
        preferences?: ts.UserPreferences;
    }
    export interface Diagnostic {
        message: string;
        range?: FourSlash.Range;
        code: number;
        reportsUnnecessary?: true;
        reportsDeprecated?: true;
    }
    export interface GetEditsForFileRenameOptions {
        readonly oldPath: string;
        readonly newPath: string;
        readonly newFileContents: {
            readonly [fileName: string]: string;
        };
        readonly preferences?: ts.UserPreferences;
    }
    export interface MoveToNewFileOptions {
        readonly newFileContents: {
            readonly [fileName: string]: string;
        };
        readonly preferences?: ts.UserPreferences;
    }
    export type RenameLocationsOptions = readonly RenameLocationOptions[] | {
        readonly findInStrings?: boolean;
        readonly findInComments?: boolean;
        readonly ranges: readonly RenameLocationOptions[];
        readonly providePrefixAndSuffixTextForRename?: boolean;
    };
    export interface DiagnosticIgnoredInterpolations {
        template: string;
    }
    export type RenameLocationOptions = FourSlash.Range | {
        readonly range: FourSlash.Range;
        readonly prefixText?: string;
        readonly suffixText?: string;
    };
    export interface RenameOptions {
        readonly findInStrings?: boolean;
        readonly findInComments?: boolean;
        readonly providePrefixAndSuffixTextForRename?: boolean;
    }
    export {};
}
declare namespace Harness {
    interface TypeWriterTypeResult {
        line: number;
        syntaxKind: number;
        sourceText: string;
        type: string;
    }
    interface TypeWriterSymbolResult {
        line: number;
        syntaxKind: number;
        sourceText: string;
        symbol: string;
    }
    interface TypeWriterResult {
        line: number;
        syntaxKind: number;
        sourceText: string;
        symbol?: string;
        type?: string;
    }
    class TypeWriterWalker {
        private program;
        private hadErrorBaseline;
        currentSourceFile: ts.SourceFile;
        private checker;
        constructor(program: ts.Program, hadErrorBaseline: boolean);
        getSymbols(fileName: string): IterableIterator<TypeWriterSymbolResult>;
        getTypes(fileName: string): IterableIterator<TypeWriterTypeResult>;
        private visitNode;
        private isImportStatementName;
        private isExportStatementName;
        private isIntrinsicJsxTag;
        private writeTypeOrSymbol;
    }
}
//# sourceMappingURL=harness.d.ts.map