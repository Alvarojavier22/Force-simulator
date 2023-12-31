declare namespace ts {
    /** Defines a list of overloads by ordinal */
    type OverloadDefinitions = {
        readonly [P in number]: (...args: any[]) => any;
    };
    /** Extracts the ordinals from an set of overload definitions. */
    type OverloadKeys<T extends OverloadDefinitions> = Extract<keyof T, number>;
    /** Extracts a union of the potential parameter lists for each overload. */
    type OverloadParameters<T extends OverloadDefinitions> = Parameters<{
        [P in OverloadKeys<T>]: T[P];
    }[OverloadKeys<T>]>;
    /** Constructs an intersection of each overload in a set of overload definitions. */
    type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
    type OverloadFunction<T extends OverloadDefinitions> = UnionToIntersection<T[keyof T]>;
    /** Maps each ordinal in a set of overload definitions to a function that can be used to bind its arguments. */
    type OverloadBinders<T extends OverloadDefinitions> = {
        [P in OverloadKeys<T>]: (args: OverloadParameters<T>) => boolean | undefined;
    };
    /** Defines deprecations for specific overloads by ordinal. */
    type OverloadDeprecations<T extends OverloadDefinitions> = {
        [P in OverloadKeys<T>]?: DeprecationOptions;
    };
    export function createOverload<T extends OverloadDefinitions>(name: string, overloads: T, binder: OverloadBinders<T>, deprecations?: OverloadDeprecations<T>): UnionToIntersection<T[keyof T]>;
    interface OverloadBuilder {
        overload<T extends OverloadDefinitions>(overloads: T): BindableOverloadBuilder<T>;
    }
    interface BindableOverloadBuilder<T extends OverloadDefinitions> {
        bind(binder: OverloadBinders<T>): BoundOverloadBuilder<T>;
    }
    interface FinishableOverloadBuilder<T extends OverloadDefinitions> {
        finish(): OverloadFunction<T>;
    }
    interface BoundOverloadBuilder<T extends OverloadDefinitions> extends FinishableOverloadBuilder<T> {
        deprecate(deprecations: OverloadDeprecations<T>): FinishableOverloadBuilder<T>;
    }
    export function buildOverload(name: string): OverloadBuilder;
    export {};
}
declare namespace ts {
    /** @deprecated Use `factory.createNodeArray` or the factory supplied by your transformation context instead. */
    const createNodeArray: <T extends Node>(elements?: readonly T[] | undefined, hasTrailingComma?: boolean | undefined) => NodeArray<T>;
    /** @deprecated Use `factory.createNumericLiteral` or the factory supplied by your transformation context instead. */
    const createNumericLiteral: (value: string | number, numericLiteralFlags?: TokenFlags | undefined) => NumericLiteral;
    /** @deprecated Use `factory.createBigIntLiteral` or the factory supplied by your transformation context instead. */
    const createBigIntLiteral: (value: string | PseudoBigInt) => BigIntLiteral;
    /** @deprecated Use `factory.createStringLiteral` or the factory supplied by your transformation context instead. */
    const createStringLiteral: {
        (text: string, isSingleQuote?: boolean | undefined): StringLiteral;
        (text: string, isSingleQuote?: boolean | undefined, hasExtendedUnicodeEscape?: boolean | undefined): StringLiteral;
    };
    /** @deprecated Use `factory.createStringLiteralFromNode` or the factory supplied by your transformation context instead. */
    const createStringLiteralFromNode: (sourceNode: PrivateIdentifier | PropertyNameLiteral, isSingleQuote?: boolean | undefined) => StringLiteral;
    /** @deprecated Use `factory.createRegularExpressionLiteral` or the factory supplied by your transformation context instead. */
    const createRegularExpressionLiteral: (text: string) => RegularExpressionLiteral;
    /** @deprecated Use `factory.createLoopVariable` or the factory supplied by your transformation context instead. */
    const createLoopVariable: (reservedInNestedScopes?: boolean | undefined) => Identifier;
    /** @deprecated Use `factory.createUniqueName` or the factory supplied by your transformation context instead. */
    const createUniqueName: (text: string, flags?: GeneratedIdentifierFlags | undefined) => Identifier;
    /** @deprecated Use `factory.createPrivateIdentifier` or the factory supplied by your transformation context instead. */
    const createPrivateIdentifier: (text: string) => PrivateIdentifier;
    /** @deprecated Use `factory.createSuper` or the factory supplied by your transformation context instead. */
    const createSuper: () => SuperExpression;
    /** @deprecated Use `factory.createThis` or the factory supplied by your transformation context instead. */
    const createThis: () => ThisExpression;
    /** @deprecated Use `factory.createNull` or the factory supplied by your transformation context instead. */
    const createNull: () => NullLiteral;
    /** @deprecated Use `factory.createTrue` or the factory supplied by your transformation context instead. */
    const createTrue: () => TrueLiteral;
    /** @deprecated Use `factory.createFalse` or the factory supplied by your transformation context instead. */
    const createFalse: () => FalseLiteral;
    /** @deprecated Use `factory.createModifier` or the factory supplied by your transformation context instead. */
    const createModifier: <T extends ModifierSyntaxKind>(kind: T) => ModifierToken<T>;
    /** @deprecated Use `factory.createModifiersFromModifierFlags` or the factory supplied by your transformation context instead. */
    const createModifiersFromModifierFlags: (flags: ModifierFlags) => Modifier[] | undefined;
    /** @deprecated Use `factory.createQualifiedName` or the factory supplied by your transformation context instead. */
    const createQualifiedName: (left: EntityName, right: string | Identifier) => QualifiedName;
    /** @deprecated Use `factory.updateQualifiedName` or the factory supplied by your transformation context instead. */
    const updateQualifiedName: (node: QualifiedName, left: EntityName, right: Identifier) => QualifiedName;
    /** @deprecated Use `factory.createComputedPropertyName` or the factory supplied by your transformation context instead. */
    const createComputedPropertyName: (expression: Expression) => ComputedPropertyName;
    /** @deprecated Use `factory.updateComputedPropertyName` or the factory supplied by your transformation context instead. */
    const updateComputedPropertyName: (node: ComputedPropertyName, expression: Expression) => ComputedPropertyName;
    /** @deprecated Use `factory.createTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
    const createTypeParameterDeclaration: {
        (modifiers: readonly Modifier[] | undefined, name: string | Identifier, constraint?: TypeNode | undefined, defaultType?: TypeNode | undefined): TypeParameterDeclaration;
        (name: string | Identifier, constraint?: TypeNode | undefined, defaultType?: TypeNode | undefined): TypeParameterDeclaration;
    };
    /** @deprecated Use `factory.updateTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
    const updateTypeParameterDeclaration: {
        (node: TypeParameterDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration;
        (node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration;
    };
    /** @deprecated Use `factory.createParameterDeclaration` or the factory supplied by your transformation context instead. */
    const createParameter: {
        (modifiers: readonly ModifierLike[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken | undefined, type?: TypeNode | undefined, initializer?: Expression | undefined): ParameterDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken | undefined, type?: TypeNode | undefined, initializer?: Expression | undefined): ParameterDeclaration;
    };
    /** @deprecated Use `factory.updateParameterDeclaration` or the factory supplied by your transformation context instead. */
    const updateParameter: {
        (node: ParameterDeclaration, modifiers: readonly ModifierLike[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration;
        (node: ParameterDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration;
    };
    /** @deprecated Use `factory.createDecorator` or the factory supplied by your transformation context instead. */
    const createDecorator: (expression: Expression) => Decorator;
    /** @deprecated Use `factory.updateDecorator` or the factory supplied by your transformation context instead. */
    const updateDecorator: (node: Decorator, expression: Expression) => Decorator;
    /** @deprecated Use `factory.createPropertyDeclaration` or the factory supplied by your transformation context instead. */
    const createProperty: {
        (modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
    };
    /** @deprecated Use `factory.updatePropertyDeclaration` or the factory supplied by your transformation context instead. */
    const updateProperty: {
        (node: PropertyDeclaration, modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        (node: PropertyDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
    };
    /** @deprecated Use `factory.createMethodDeclaration` or the factory supplied by your transformation context instead. */
    const createMethod: {
        (modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
    };
    /** @deprecated Use `factory.updateMethodDeclaration` or the factory supplied by your transformation context instead. */
    const updateMethod: {
        (node: MethodDeclaration, modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        (node: MethodDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
    };
    /** @deprecated Use `factory.createConstructorDeclaration` or the factory supplied by your transformation context instead. */
    const createConstructor: {
        (modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
    };
    /** @deprecated Use `factory.updateConstructorDeclaration` or the factory supplied by your transformation context instead. */
    const updateConstructor: {
        (node: ConstructorDeclaration, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        (node: ConstructorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
    };
    /** @deprecated Use `factory.createGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const createGetAccessor: {
        (modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
    };
    /** @deprecated Use `factory.updateGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const updateGetAccessor: {
        (node: GetAccessorDeclaration, modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        (node: GetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
    };
    /** @deprecated Use `factory.createSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const createSetAccessor: {
        (modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
    };
    /** @deprecated Use `factory.updateSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const updateSetAccessor: {
        (node: SetAccessorDeclaration, modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        (node: SetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
    };
    /** @deprecated Use `factory.createCallSignature` or the factory supplied by your transformation context instead. */
    const createCallSignature: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined) => CallSignatureDeclaration;
    /** @deprecated Use `factory.updateCallSignature` or the factory supplied by your transformation context instead. */
    const updateCallSignature: (node: CallSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined) => CallSignatureDeclaration;
    /** @deprecated Use `factory.createConstructSignature` or the factory supplied by your transformation context instead. */
    const createConstructSignature: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined) => ConstructSignatureDeclaration;
    /** @deprecated Use `factory.updateConstructSignature` or the factory supplied by your transformation context instead. */
    const updateConstructSignature: (node: ConstructSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined) => ConstructSignatureDeclaration;
    /** @deprecated Use `factory.updateIndexSignature` or the factory supplied by your transformation context instead. */
    const updateIndexSignature: {
        (node: IndexSignatureDeclaration, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        (node: IndexSignatureDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
    };
    /** @deprecated Use `factory.createKeywordTypeNode` or the factory supplied by your transformation context instead. */
    const createKeywordTypeNode: <TKind extends KeywordTypeSyntaxKind>(kind: TKind) => KeywordTypeNode<TKind>;
    /** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
    const createTypePredicateNodeWithModifier: (assertsModifier: AssertsKeyword | undefined, parameterName: string | Identifier | ThisTypeNode, type: TypeNode | undefined) => TypePredicateNode;
    /** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
    const updateTypePredicateNodeWithModifier: (node: TypePredicateNode, assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined) => TypePredicateNode;
    /** @deprecated Use `factory.createTypeReferenceNode` or the factory supplied by your transformation context instead. */
    const createTypeReferenceNode: (typeName: string | EntityName, typeArguments?: readonly TypeNode[] | undefined) => TypeReferenceNode;
    /** @deprecated Use `factory.updateTypeReferenceNode` or the factory supplied by your transformation context instead. */
    const updateTypeReferenceNode: (node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined) => TypeReferenceNode;
    /** @deprecated Use `factory.createFunctionTypeNode` or the factory supplied by your transformation context instead. */
    const createFunctionTypeNode: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode) => FunctionTypeNode;
    /** @deprecated Use `factory.updateFunctionTypeNode` or the factory supplied by your transformation context instead. */
    const updateFunctionTypeNode: (node: FunctionTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode) => FunctionTypeNode;
    /** @deprecated Use `factory.createConstructorTypeNode` or the factory supplied by your transformation context instead. */
    const createConstructorTypeNode: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode) => ConstructorTypeNode;
    /** @deprecated Use `factory.updateConstructorTypeNode` or the factory supplied by your transformation context instead. */
    const updateConstructorTypeNode: (node: ConstructorTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode) => ConstructorTypeNode;
    /** @deprecated Use `factory.createTypeQueryNode` or the factory supplied by your transformation context instead. */
    const createTypeQueryNode: (exprName: EntityName, typeArguments?: readonly TypeNode[] | undefined) => TypeQueryNode;
    /** @deprecated Use `factory.updateTypeQueryNode` or the factory supplied by your transformation context instead. */
    const updateTypeQueryNode: (node: TypeQueryNode, exprName: EntityName, typeArguments?: readonly TypeNode[] | undefined) => TypeQueryNode;
    /** @deprecated Use `factory.createTypeLiteralNode` or the factory supplied by your transformation context instead. */
    const createTypeLiteralNode: (members: readonly TypeElement[] | undefined) => TypeLiteralNode;
    /** @deprecated Use `factory.updateTypeLiteralNode` or the factory supplied by your transformation context instead. */
    const updateTypeLiteralNode: (node: TypeLiteralNode, members: NodeArray<TypeElement>) => TypeLiteralNode;
    /** @deprecated Use `factory.createArrayTypeNode` or the factory supplied by your transformation context instead. */
    const createArrayTypeNode: (elementType: TypeNode) => ArrayTypeNode;
    /** @deprecated Use `factory.updateArrayTypeNode` or the factory supplied by your transformation context instead. */
    const updateArrayTypeNode: (node: ArrayTypeNode, elementType: TypeNode) => ArrayTypeNode;
    /** @deprecated Use `factory.createTupleTypeNode` or the factory supplied by your transformation context instead. */
    const createTupleTypeNode: (elements: readonly (TypeNode | NamedTupleMember)[]) => TupleTypeNode;
    /** @deprecated Use `factory.updateTupleTypeNode` or the factory supplied by your transformation context instead. */
    const updateTupleTypeNode: (node: TupleTypeNode, elements: readonly (TypeNode | NamedTupleMember)[]) => TupleTypeNode;
    /** @deprecated Use `factory.createOptionalTypeNode` or the factory supplied by your transformation context instead. */
    const createOptionalTypeNode: (type: TypeNode) => OptionalTypeNode;
    /** @deprecated Use `factory.updateOptionalTypeNode` or the factory supplied by your transformation context instead. */
    const updateOptionalTypeNode: (node: OptionalTypeNode, type: TypeNode) => OptionalTypeNode;
    /** @deprecated Use `factory.createRestTypeNode` or the factory supplied by your transformation context instead. */
    const createRestTypeNode: (type: TypeNode) => RestTypeNode;
    /** @deprecated Use `factory.updateRestTypeNode` or the factory supplied by your transformation context instead. */
    const updateRestTypeNode: (node: RestTypeNode, type: TypeNode) => RestTypeNode;
    /** @deprecated Use `factory.createUnionTypeNode` or the factory supplied by your transformation context instead. */
    const createUnionTypeNode: (types: readonly TypeNode[]) => UnionTypeNode;
    /** @deprecated Use `factory.updateUnionTypeNode` or the factory supplied by your transformation context instead. */
    const updateUnionTypeNode: (node: UnionTypeNode, types: NodeArray<TypeNode>) => UnionTypeNode;
    /** @deprecated Use `factory.createIntersectionTypeNode` or the factory supplied by your transformation context instead. */
    const createIntersectionTypeNode: (types: readonly TypeNode[]) => IntersectionTypeNode;
    /** @deprecated Use `factory.updateIntersectionTypeNode` or the factory supplied by your transformation context instead. */
    const updateIntersectionTypeNode: (node: IntersectionTypeNode, types: NodeArray<TypeNode>) => IntersectionTypeNode;
    /** @deprecated Use `factory.createConditionalTypeNode` or the factory supplied by your transformation context instead. */
    const createConditionalTypeNode: (checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode) => ConditionalTypeNode;
    /** @deprecated Use `factory.updateConditionalTypeNode` or the factory supplied by your transformation context instead. */
    const updateConditionalTypeNode: (node: ConditionalTypeNode, checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode) => ConditionalTypeNode;
    /** @deprecated Use `factory.createInferTypeNode` or the factory supplied by your transformation context instead. */
    const createInferTypeNode: (typeParameter: TypeParameterDeclaration) => InferTypeNode;
    /** @deprecated Use `factory.updateInferTypeNode` or the factory supplied by your transformation context instead. */
    const updateInferTypeNode: (node: InferTypeNode, typeParameter: TypeParameterDeclaration) => InferTypeNode;
    /** @deprecated Use `factory.createImportTypeNode` or the factory supplied by your transformation context instead. */
    const createImportTypeNode: {
        (argument: TypeNode, assertions?: ImportTypeAssertionContainer | undefined, qualifier?: EntityName | undefined, typeArguments?: readonly TypeNode[] | undefined, isTypeOf?: boolean | undefined): ImportTypeNode;
        (argument: TypeNode, assertions?: ImportTypeAssertionContainer | undefined, qualifier?: EntityName | undefined, typeArguments?: readonly TypeNode[] | undefined, isTypeOf?: boolean | undefined): ImportTypeNode;
        (argument: TypeNode, qualifier?: EntityName | undefined, typeArguments?: readonly TypeNode[] | undefined, isTypeOf?: boolean | undefined): ImportTypeNode;
    };
    /** @deprecated Use `factory.updateImportTypeNode` or the factory supplied by your transformation context instead. */
    const updateImportTypeNode: {
        (node: ImportTypeNode, argument: TypeNode, assertions: ImportTypeAssertionContainer | undefined, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean | undefined): ImportTypeNode;
        (node: ImportTypeNode, argument: TypeNode, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean | undefined): ImportTypeNode;
    };
    /** @deprecated Use `factory.createParenthesizedType` or the factory supplied by your transformation context instead. */
    const createParenthesizedType: (type: TypeNode) => ParenthesizedTypeNode;
    /** @deprecated Use `factory.updateParenthesizedType` or the factory supplied by your transformation context instead. */
    const updateParenthesizedType: (node: ParenthesizedTypeNode, type: TypeNode) => ParenthesizedTypeNode;
    /** @deprecated Use `factory.createThisTypeNode` or the factory supplied by your transformation context instead. */
    const createThisTypeNode: () => ThisTypeNode;
    /** @deprecated Use `factory.updateTypeOperatorNode` or the factory supplied by your transformation context instead. */
    const updateTypeOperatorNode: (node: TypeOperatorNode, type: TypeNode) => TypeOperatorNode;
    /** @deprecated Use `factory.createIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
    const createIndexedAccessTypeNode: (objectType: TypeNode, indexType: TypeNode) => IndexedAccessTypeNode;
    /** @deprecated Use `factory.updateIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
    const updateIndexedAccessTypeNode: (node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode) => IndexedAccessTypeNode;
    /** @deprecated Use `factory.createMappedTypeNode` or the factory supplied by your transformation context instead. */
    const createMappedTypeNode: (readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: NodeArray<TypeElement> | undefined) => MappedTypeNode;
    /** @deprecated Use `factory.updateMappedTypeNode` or the factory supplied by your transformation context instead. */
    const updateMappedTypeNode: (node: MappedTypeNode, readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: NodeArray<TypeElement> | undefined) => MappedTypeNode;
    /** @deprecated Use `factory.createLiteralTypeNode` or the factory supplied by your transformation context instead. */
    const createLiteralTypeNode: (literal: LiteralExpression | BooleanLiteral | PrefixUnaryExpression | NullLiteral) => LiteralTypeNode;
    /** @deprecated Use `factory.updateLiteralTypeNode` or the factory supplied by your transformation context instead. */
    const updateLiteralTypeNode: (node: LiteralTypeNode, literal: LiteralExpression | BooleanLiteral | PrefixUnaryExpression | NullLiteral) => LiteralTypeNode;
    /** @deprecated Use `factory.createObjectBindingPattern` or the factory supplied by your transformation context instead. */
    const createObjectBindingPattern: (elements: readonly BindingElement[]) => ObjectBindingPattern;
    /** @deprecated Use `factory.updateObjectBindingPattern` or the factory supplied by your transformation context instead. */
    const updateObjectBindingPattern: (node: ObjectBindingPattern, elements: readonly BindingElement[]) => ObjectBindingPattern;
    /** @deprecated Use `factory.createArrayBindingPattern` or the factory supplied by your transformation context instead. */
    const createArrayBindingPattern: (elements: readonly ArrayBindingElement[]) => ArrayBindingPattern;
    /** @deprecated Use `factory.updateArrayBindingPattern` or the factory supplied by your transformation context instead. */
    const updateArrayBindingPattern: (node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]) => ArrayBindingPattern;
    /** @deprecated Use `factory.createBindingElement` or the factory supplied by your transformation context instead. */
    const createBindingElement: (dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression | undefined) => BindingElement;
    /** @deprecated Use `factory.updateBindingElement` or the factory supplied by your transformation context instead. */
    const updateBindingElement: (node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined) => BindingElement;
    /** @deprecated Use `factory.createArrayLiteralExpression` or the factory supplied by your transformation context instead. */
    const createArrayLiteral: (elements?: readonly Expression[] | undefined, multiLine?: boolean | undefined) => ArrayLiteralExpression;
    /** @deprecated Use `factory.updateArrayLiteralExpression` or the factory supplied by your transformation context instead. */
    const updateArrayLiteral: (node: ArrayLiteralExpression, elements: readonly Expression[]) => ArrayLiteralExpression;
    /** @deprecated Use `factory.createObjectLiteralExpression` or the factory supplied by your transformation context instead. */
    const createObjectLiteral: (properties?: readonly ObjectLiteralElementLike[] | undefined, multiLine?: boolean | undefined) => ObjectLiteralExpression;
    /** @deprecated Use `factory.updateObjectLiteralExpression` or the factory supplied by your transformation context instead. */
    const updateObjectLiteral: (node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]) => ObjectLiteralExpression;
    /** @deprecated Use `factory.createPropertyAccessExpression` or the factory supplied by your transformation context instead. */
    const createPropertyAccess: (expression: Expression, name: string | MemberName) => PropertyAccessExpression;
    /** @deprecated Use `factory.updatePropertyAccessExpression` or the factory supplied by your transformation context instead. */
    const updatePropertyAccess: (node: PropertyAccessExpression, expression: Expression, name: MemberName) => PropertyAccessExpression;
    /** @deprecated Use `factory.createPropertyAccessChain` or the factory supplied by your transformation context instead. */
    const createPropertyAccessChain: (expression: Expression, questionDotToken: QuestionDotToken | undefined, name: string | MemberName) => PropertyAccessChain;
    /** @deprecated Use `factory.updatePropertyAccessChain` or the factory supplied by your transformation context instead. */
    const updatePropertyAccessChain: (node: PropertyAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, name: MemberName) => PropertyAccessChain;
    /** @deprecated Use `factory.createElementAccessExpression` or the factory supplied by your transformation context instead. */
    const createElementAccess: (expression: Expression, index: number | Expression) => ElementAccessExpression;
    /** @deprecated Use `factory.updateElementAccessExpression` or the factory supplied by your transformation context instead. */
    const updateElementAccess: (node: ElementAccessExpression, expression: Expression, argumentExpression: Expression) => ElementAccessExpression;
    /** @deprecated Use `factory.createElementAccessChain` or the factory supplied by your transformation context instead. */
    const createElementAccessChain: (expression: Expression, questionDotToken: QuestionDotToken | undefined, index: number | Expression) => ElementAccessChain;
    /** @deprecated Use `factory.updateElementAccessChain` or the factory supplied by your transformation context instead. */
    const updateElementAccessChain: (node: ElementAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, argumentExpression: Expression) => ElementAccessChain;
    /** @deprecated Use `factory.createCallExpression` or the factory supplied by your transformation context instead. */
    const createCall: (expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) => CallExpression;
    /** @deprecated Use `factory.updateCallExpression` or the factory supplied by your transformation context instead. */
    const updateCall: (node: CallExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]) => CallExpression;
    /** @deprecated Use `factory.createCallChain` or the factory supplied by your transformation context instead. */
    const createCallChain: (expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) => CallChain;
    /** @deprecated Use `factory.updateCallChain` or the factory supplied by your transformation context instead. */
    const updateCallChain: (node: CallChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]) => CallChain;
    /** @deprecated Use `factory.createNewExpression` or the factory supplied by your transformation context instead. */
    const createNew: (expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) => NewExpression;
    /** @deprecated Use `factory.updateNewExpression` or the factory supplied by your transformation context instead. */
    const updateNew: (node: NewExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) => NewExpression;
    /** @deprecated Use `factory.createTypeAssertion` or the factory supplied by your transformation context instead. */
    const createTypeAssertion: (type: TypeNode, expression: Expression) => TypeAssertion;
    /** @deprecated Use `factory.updateTypeAssertion` or the factory supplied by your transformation context instead. */
    const updateTypeAssertion: (node: TypeAssertion, type: TypeNode, expression: Expression) => TypeAssertion;
    /** @deprecated Use `factory.createParenthesizedExpression` or the factory supplied by your transformation context instead. */
    const createParen: (expression: Expression) => ParenthesizedExpression;
    /** @deprecated Use `factory.updateParenthesizedExpression` or the factory supplied by your transformation context instead. */
    const updateParen: (node: ParenthesizedExpression, expression: Expression) => ParenthesizedExpression;
    /** @deprecated Use `factory.createFunctionExpression` or the factory supplied by your transformation context instead. */
    const createFunctionExpression: (modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[] | undefined, type: TypeNode | undefined, body: Block) => FunctionExpression;
    /** @deprecated Use `factory.updateFunctionExpression` or the factory supplied by your transformation context instead. */
    const updateFunctionExpression: (node: FunctionExpression, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block) => FunctionExpression;
    /** @deprecated Use `factory.createDeleteExpression` or the factory supplied by your transformation context instead. */
    const createDelete: (expression: Expression) => DeleteExpression;
    /** @deprecated Use `factory.updateDeleteExpression` or the factory supplied by your transformation context instead. */
    const updateDelete: (node: DeleteExpression, expression: Expression) => DeleteExpression;
    /** @deprecated Use `factory.createTypeOfExpression` or the factory supplied by your transformation context instead. */
    const createTypeOf: (expression: Expression) => TypeOfExpression;
    /** @deprecated Use `factory.updateTypeOfExpression` or the factory supplied by your transformation context instead. */
    const updateTypeOf: (node: TypeOfExpression, expression: Expression) => TypeOfExpression;
    /** @deprecated Use `factory.createVoidExpression` or the factory supplied by your transformation context instead. */
    const createVoid: (expression: Expression) => VoidExpression;
    /** @deprecated Use `factory.updateVoidExpression` or the factory supplied by your transformation context instead. */
    const updateVoid: (node: VoidExpression, expression: Expression) => VoidExpression;
    /** @deprecated Use `factory.createAwaitExpression` or the factory supplied by your transformation context instead. */
    const createAwait: (expression: Expression) => AwaitExpression;
    /** @deprecated Use `factory.updateAwaitExpression` or the factory supplied by your transformation context instead. */
    const updateAwait: (node: AwaitExpression, expression: Expression) => AwaitExpression;
    /** @deprecated Use `factory.createPrefixExpression` or the factory supplied by your transformation context instead. */
    const createPrefix: (operator: PrefixUnaryOperator, operand: Expression) => PrefixUnaryExpression;
    /** @deprecated Use `factory.updatePrefixExpression` or the factory supplied by your transformation context instead. */
    const updatePrefix: (node: PrefixUnaryExpression, operand: Expression) => PrefixUnaryExpression;
    /** @deprecated Use `factory.createPostfixUnaryExpression` or the factory supplied by your transformation context instead. */
    const createPostfix: (operand: Expression, operator: PostfixUnaryOperator) => PostfixUnaryExpression;
    /** @deprecated Use `factory.updatePostfixUnaryExpression` or the factory supplied by your transformation context instead. */
    const updatePostfix: (node: PostfixUnaryExpression, operand: Expression) => PostfixUnaryExpression;
    /** @deprecated Use `factory.createBinaryExpression` or the factory supplied by your transformation context instead. */
    const createBinary: (left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.updateConditionalExpression` or the factory supplied by your transformation context instead. */
    const updateConditional: (node: ConditionalExpression, condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression) => ConditionalExpression;
    /** @deprecated Use `factory.createTemplateExpression` or the factory supplied by your transformation context instead. */
    const createTemplateExpression: (head: TemplateHead, templateSpans: readonly TemplateSpan[]) => TemplateExpression;
    /** @deprecated Use `factory.updateTemplateExpression` or the factory supplied by your transformation context instead. */
    const updateTemplateExpression: (node: TemplateExpression, head: TemplateHead, templateSpans: readonly TemplateSpan[]) => TemplateExpression;
    /** @deprecated Use `factory.createTemplateHead` or the factory supplied by your transformation context instead. */
    const createTemplateHead: {
        (text: string, rawText?: string | undefined, templateFlags?: TokenFlags | undefined): TemplateHead;
        (text: string | undefined, rawText: string, templateFlags?: TokenFlags | undefined): TemplateHead;
    };
    /** @deprecated Use `factory.createTemplateMiddle` or the factory supplied by your transformation context instead. */
    const createTemplateMiddle: {
        (text: string, rawText?: string | undefined, templateFlags?: TokenFlags | undefined): TemplateMiddle;
        (text: string | undefined, rawText: string, templateFlags?: TokenFlags | undefined): TemplateMiddle;
    };
    /** @deprecated Use `factory.createTemplateTail` or the factory supplied by your transformation context instead. */
    const createTemplateTail: {
        (text: string, rawText?: string | undefined, templateFlags?: TokenFlags | undefined): TemplateTail;
        (text: string | undefined, rawText: string, templateFlags?: TokenFlags | undefined): TemplateTail;
    };
    /** @deprecated Use `factory.createNoSubstitutionTemplateLiteral` or the factory supplied by your transformation context instead. */
    const createNoSubstitutionTemplateLiteral: {
        (text: string, rawText?: string | undefined): NoSubstitutionTemplateLiteral;
        (text: string | undefined, rawText: string): NoSubstitutionTemplateLiteral;
    };
    /** @deprecated Use `factory.updateYieldExpression` or the factory supplied by your transformation context instead. */
    const updateYield: (node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression | undefined) => YieldExpression;
    /** @deprecated Use `factory.createSpreadExpression` or the factory supplied by your transformation context instead. */
    const createSpread: (expression: Expression) => SpreadElement;
    /** @deprecated Use `factory.updateSpreadExpression` or the factory supplied by your transformation context instead. */
    const updateSpread: (node: SpreadElement, expression: Expression) => SpreadElement;
    /** @deprecated Use `factory.createOmittedExpression` or the factory supplied by your transformation context instead. */
    const createOmittedExpression: () => OmittedExpression;
    /** @deprecated Use `factory.createAsExpression` or the factory supplied by your transformation context instead. */
    const createAsExpression: (expression: Expression, type: TypeNode) => AsExpression;
    /** @deprecated Use `factory.updateAsExpression` or the factory supplied by your transformation context instead. */
    const updateAsExpression: (node: AsExpression, expression: Expression, type: TypeNode) => AsExpression;
    /** @deprecated Use `factory.createNonNullExpression` or the factory supplied by your transformation context instead. */
    const createNonNullExpression: (expression: Expression) => NonNullExpression;
    /** @deprecated Use `factory.updateNonNullExpression` or the factory supplied by your transformation context instead. */
    const updateNonNullExpression: (node: NonNullExpression, expression: Expression) => NonNullExpression;
    /** @deprecated Use `factory.createNonNullChain` or the factory supplied by your transformation context instead. */
    const createNonNullChain: (expression: Expression) => NonNullChain;
    /** @deprecated Use `factory.updateNonNullChain` or the factory supplied by your transformation context instead. */
    const updateNonNullChain: (node: NonNullChain, expression: Expression) => NonNullChain;
    /** @deprecated Use `factory.createMetaProperty` or the factory supplied by your transformation context instead. */
    const createMetaProperty: (keywordToken: SyntaxKind.ImportKeyword | SyntaxKind.NewKeyword, name: Identifier) => MetaProperty;
    /** @deprecated Use `factory.updateMetaProperty` or the factory supplied by your transformation context instead. */
    const updateMetaProperty: (node: MetaProperty, name: Identifier) => MetaProperty;
    /** @deprecated Use `factory.createTemplateSpan` or the factory supplied by your transformation context instead. */
    const createTemplateSpan: (expression: Expression, literal: TemplateMiddle | TemplateTail) => TemplateSpan;
    /** @deprecated Use `factory.updateTemplateSpan` or the factory supplied by your transformation context instead. */
    const updateTemplateSpan: (node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail) => TemplateSpan;
    /** @deprecated Use `factory.createSemicolonClassElement` or the factory supplied by your transformation context instead. */
    const createSemicolonClassElement: () => SemicolonClassElement;
    /** @deprecated Use `factory.createBlock` or the factory supplied by your transformation context instead. */
    const createBlock: (statements: readonly Statement[], multiLine?: boolean | undefined) => Block;
    /** @deprecated Use `factory.updateBlock` or the factory supplied by your transformation context instead. */
    const updateBlock: (node: Block, statements: readonly Statement[]) => Block;
    /** @deprecated Use `factory.createVariableStatement` or the factory supplied by your transformation context instead. */
    const createVariableStatement: (modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]) => VariableStatement;
    /** @deprecated Use `factory.updateVariableStatement` or the factory supplied by your transformation context instead. */
    const updateVariableStatement: (node: VariableStatement, modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList) => VariableStatement;
    /** @deprecated Use `factory.createEmptyStatement` or the factory supplied by your transformation context instead. */
    const createEmptyStatement: () => EmptyStatement;
    /** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
    const createExpressionStatement: (expression: Expression) => ExpressionStatement;
    /** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
    const updateExpressionStatement: (node: ExpressionStatement, expression: Expression) => ExpressionStatement;
    /** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
    const createStatement: (expression: Expression) => ExpressionStatement;
    /** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
    const updateStatement: (node: ExpressionStatement, expression: Expression) => ExpressionStatement;
    /** @deprecated Use `factory.createIfStatement` or the factory supplied by your transformation context instead. */
    const createIf: (expression: Expression, thenStatement: Statement, elseStatement?: Statement | undefined) => IfStatement;
    /** @deprecated Use `factory.updateIfStatement` or the factory supplied by your transformation context instead. */
    const updateIf: (node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined) => IfStatement;
    /** @deprecated Use `factory.createDoStatement` or the factory supplied by your transformation context instead. */
    const createDo: (statement: Statement, expression: Expression) => DoStatement;
    /** @deprecated Use `factory.updateDoStatement` or the factory supplied by your transformation context instead. */
    const updateDo: (node: DoStatement, statement: Statement, expression: Expression) => DoStatement;
    /** @deprecated Use `factory.createWhileStatement` or the factory supplied by your transformation context instead. */
    const createWhile: (expression: Expression, statement: Statement) => WhileStatement;
    /** @deprecated Use `factory.updateWhileStatement` or the factory supplied by your transformation context instead. */
    const updateWhile: (node: WhileStatement, expression: Expression, statement: Statement) => WhileStatement;
    /** @deprecated Use `factory.createForStatement` or the factory supplied by your transformation context instead. */
    const createFor: (initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) => ForStatement;
    /** @deprecated Use `factory.updateForStatement` or the factory supplied by your transformation context instead. */
    const updateFor: (node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) => ForStatement;
    /** @deprecated Use `factory.createForInStatement` or the factory supplied by your transformation context instead. */
    const createForIn: (initializer: ForInitializer, expression: Expression, statement: Statement) => ForInStatement;
    /** @deprecated Use `factory.updateForInStatement` or the factory supplied by your transformation context instead. */
    const updateForIn: (node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement) => ForInStatement;
    /** @deprecated Use `factory.createForOfStatement` or the factory supplied by your transformation context instead. */
    const createForOf: (awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) => ForOfStatement;
    /** @deprecated Use `factory.updateForOfStatement` or the factory supplied by your transformation context instead. */
    const updateForOf: (node: ForOfStatement, awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) => ForOfStatement;
    /** @deprecated Use `factory.createContinueStatement` or the factory supplied by your transformation context instead. */
    const createContinue: (label?: string | Identifier | undefined) => ContinueStatement;
    /** @deprecated Use `factory.updateContinueStatement` or the factory supplied by your transformation context instead. */
    const updateContinue: (node: ContinueStatement, label: Identifier | undefined) => ContinueStatement;
    /** @deprecated Use `factory.createBreakStatement` or the factory supplied by your transformation context instead. */
    const createBreak: (label?: string | Identifier | undefined) => BreakStatement;
    /** @deprecated Use `factory.updateBreakStatement` or the factory supplied by your transformation context instead. */
    const updateBreak: (node: BreakStatement, label: Identifier | undefined) => BreakStatement;
    /** @deprecated Use `factory.createReturnStatement` or the factory supplied by your transformation context instead. */
    const createReturn: (expression?: Expression | undefined) => ReturnStatement;
    /** @deprecated Use `factory.updateReturnStatement` or the factory supplied by your transformation context instead. */
    const updateReturn: (node: ReturnStatement, expression: Expression | undefined) => ReturnStatement;
    /** @deprecated Use `factory.createWithStatement` or the factory supplied by your transformation context instead. */
    const createWith: (expression: Expression, statement: Statement) => WithStatement;
    /** @deprecated Use `factory.updateWithStatement` or the factory supplied by your transformation context instead. */
    const updateWith: (node: WithStatement, expression: Expression, statement: Statement) => WithStatement;
    /** @deprecated Use `factory.createSwitchStatement` or the factory supplied by your transformation context instead. */
    const createSwitch: (expression: Expression, caseBlock: CaseBlock) => SwitchStatement;
    /** @deprecated Use `factory.updateSwitchStatement` or the factory supplied by your transformation context instead. */
    const updateSwitch: (node: SwitchStatement, expression: Expression, caseBlock: CaseBlock) => SwitchStatement;
    /** @deprecated Use `factory.createLabelStatement` or the factory supplied by your transformation context instead. */
    const createLabel: (label: string | Identifier, statement: Statement) => LabeledStatement;
    /** @deprecated Use `factory.updateLabelStatement` or the factory supplied by your transformation context instead. */
    const updateLabel: (node: LabeledStatement, label: Identifier, statement: Statement) => LabeledStatement;
    /** @deprecated Use `factory.createThrowStatement` or the factory supplied by your transformation context instead. */
    const createThrow: (expression: Expression) => ThrowStatement;
    /** @deprecated Use `factory.updateThrowStatement` or the factory supplied by your transformation context instead. */
    const updateThrow: (node: ThrowStatement, expression: Expression) => ThrowStatement;
    /** @deprecated Use `factory.createTryStatement` or the factory supplied by your transformation context instead. */
    const createTry: (tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) => TryStatement;
    /** @deprecated Use `factory.updateTryStatement` or the factory supplied by your transformation context instead. */
    const updateTry: (node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) => TryStatement;
    /** @deprecated Use `factory.createDebuggerStatement` or the factory supplied by your transformation context instead. */
    const createDebuggerStatement: () => DebuggerStatement;
    /** @deprecated Use `factory.createVariableDeclarationList` or the factory supplied by your transformation context instead. */
    const createVariableDeclarationList: (declarations: readonly VariableDeclaration[], flags?: NodeFlags | undefined) => VariableDeclarationList;
    /** @deprecated Use `factory.updateVariableDeclarationList` or the factory supplied by your transformation context instead. */
    const updateVariableDeclarationList: (node: VariableDeclarationList, declarations: readonly VariableDeclaration[]) => VariableDeclarationList;
    /** @deprecated Use `factory.createFunctionDeclaration` or the factory supplied by your transformation context instead. */
    const createFunctionDeclaration: {
        (modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
    };
    /** @deprecated Use `factory.updateFunctionDeclaration` or the factory supplied by your transformation context instead. */
    const updateFunctionDeclaration: {
        (node: FunctionDeclaration, modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        (node: FunctionDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
    };
    /** @deprecated Use `factory.createClassDeclaration` or the factory supplied by your transformation context instead. */
    const createClassDeclaration: {
        (modifiers: readonly ModifierLike[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
    };
    /** @deprecated Use `factory.updateClassDeclaration` or the factory supplied by your transformation context instead. */
    const updateClassDeclaration: {
        (node: ClassDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        (node: ClassDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
    };
    /** @deprecated Use `factory.createInterfaceDeclaration` or the factory supplied by your transformation context instead. */
    const createInterfaceDeclaration: {
        (modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
    };
    /** @deprecated Use `factory.updateInterfaceDeclaration` or the factory supplied by your transformation context instead. */
    const updateInterfaceDeclaration: {
        (node: InterfaceDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        (node: InterfaceDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
    };
    /** @deprecated Use `factory.createTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
    const createTypeAliasDeclaration: {
        (modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
    };
    /** @deprecated Use `factory.updateTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
    const updateTypeAliasDeclaration: {
        (node: TypeAliasDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        (node: TypeAliasDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
    };
    /** @deprecated Use `factory.createEnumDeclaration` or the factory supplied by your transformation context instead. */
    const createEnumDeclaration: {
        (modifiers: readonly Modifier[] | undefined, name: string | Identifier, members: readonly EnumMember[]): EnumDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, members: readonly EnumMember[]): EnumDeclaration;
    };
    /** @deprecated Use `factory.updateEnumDeclaration` or the factory supplied by your transformation context instead. */
    const updateEnumDeclaration: {
        (node: EnumDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration;
        (node: EnumDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration;
    };
    /** @deprecated Use `factory.createModuleDeclaration` or the factory supplied by your transformation context instead. */
    const createModuleDeclaration: {
        (modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags | undefined): ModuleDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags | undefined): ModuleDeclaration;
    };
    /** @deprecated Use `factory.updateModuleDeclaration` or the factory supplied by your transformation context instead. */
    const updateModuleDeclaration: {
        (node: ModuleDeclaration, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration;
        (node: ModuleDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration;
    };
    /** @deprecated Use `factory.createModuleBlock` or the factory supplied by your transformation context instead. */
    const createModuleBlock: (statements: readonly Statement[]) => ModuleBlock;
    /** @deprecated Use `factory.updateModuleBlock` or the factory supplied by your transformation context instead. */
    const updateModuleBlock: (node: ModuleBlock, statements: readonly Statement[]) => ModuleBlock;
    /** @deprecated Use `factory.createCaseBlock` or the factory supplied by your transformation context instead. */
    const createCaseBlock: (clauses: readonly CaseOrDefaultClause[]) => CaseBlock;
    /** @deprecated Use `factory.updateCaseBlock` or the factory supplied by your transformation context instead. */
    const updateCaseBlock: (node: CaseBlock, clauses: readonly CaseOrDefaultClause[]) => CaseBlock;
    /** @deprecated Use `factory.createNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
    const createNamespaceExportDeclaration: (name: string | Identifier) => NamespaceExportDeclaration;
    /** @deprecated Use `factory.updateNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
    const updateNamespaceExportDeclaration: (node: NamespaceExportDeclaration, name: Identifier) => NamespaceExportDeclaration;
    /** @deprecated Use `factory.createImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
    const createImportEqualsDeclaration: {
        (modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
    };
    /** @deprecated Use `factory.updateImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
    const updateImportEqualsDeclaration: {
        (node: ImportEqualsDeclaration, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        (node: ImportEqualsDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
    };
    /** @deprecated Use `factory.createImportDeclaration` or the factory supplied by your transformation context instead. */
    const createImportDeclaration: {
        (modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause?: AssertClause | undefined): ImportDeclaration;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause?: AssertClause | undefined): ImportDeclaration;
    };
    /** @deprecated Use `factory.updateImportDeclaration` or the factory supplied by your transformation context instead. */
    const updateImportDeclaration: {
        (node: ImportDeclaration, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration;
        (node: ImportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration;
    };
    /** @deprecated Use `factory.createNamespaceImport` or the factory supplied by your transformation context instead. */
    const createNamespaceImport: (name: Identifier) => NamespaceImport;
    /** @deprecated Use `factory.updateNamespaceImport` or the factory supplied by your transformation context instead. */
    const updateNamespaceImport: (node: NamespaceImport, name: Identifier) => NamespaceImport;
    /** @deprecated Use `factory.createNamedImports` or the factory supplied by your transformation context instead. */
    const createNamedImports: (elements: readonly ImportSpecifier[]) => NamedImports;
    /** @deprecated Use `factory.updateNamedImports` or the factory supplied by your transformation context instead. */
    const updateNamedImports: (node: NamedImports, elements: readonly ImportSpecifier[]) => NamedImports;
    /** @deprecated Use `factory.createImportSpecifier` or the factory supplied by your transformation context instead. */
    const createImportSpecifier: (isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier) => ImportSpecifier;
    /** @deprecated Use `factory.updateImportSpecifier` or the factory supplied by your transformation context instead. */
    const updateImportSpecifier: (node: ImportSpecifier, isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier) => ImportSpecifier;
    /** @deprecated Use `factory.createExportAssignment` or the factory supplied by your transformation context instead. */
    const createExportAssignment: {
        (modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment;
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment;
    };
    /** @deprecated Use `factory.updateExportAssignment` or the factory supplied by your transformation context instead. */
    const updateExportAssignment: {
        (node: ExportAssignment, modifiers: readonly Modifier[] | undefined, expression: Expression): ExportAssignment;
        (node: ExportAssignment, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, expression: Expression): ExportAssignment;
    };
    /** @deprecated Use `factory.createNamedExports` or the factory supplied by your transformation context instead. */
    const createNamedExports: (elements: readonly ExportSpecifier[]) => NamedExports;
    /** @deprecated Use `factory.updateNamedExports` or the factory supplied by your transformation context instead. */
    const updateNamedExports: (node: NamedExports, elements: readonly ExportSpecifier[]) => NamedExports;
    /** @deprecated Use `factory.createExportSpecifier` or the factory supplied by your transformation context instead. */
    const createExportSpecifier: (isTypeOnly: boolean, propertyName: string | Identifier | undefined, name: string | Identifier) => ExportSpecifier;
    /** @deprecated Use `factory.updateExportSpecifier` or the factory supplied by your transformation context instead. */
    const updateExportSpecifier: (node: ExportSpecifier, isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier) => ExportSpecifier;
    /** @deprecated Use `factory.createExternalModuleReference` or the factory supplied by your transformation context instead. */
    const createExternalModuleReference: (expression: Expression) => ExternalModuleReference;
    /** @deprecated Use `factory.updateExternalModuleReference` or the factory supplied by your transformation context instead. */
    const updateExternalModuleReference: (node: ExternalModuleReference, expression: Expression) => ExternalModuleReference;
    /** @deprecated Use `factory.createJSDocTypeExpression` or the factory supplied by your transformation context instead. */
    const createJSDocTypeExpression: (type: TypeNode) => JSDocTypeExpression;
    /** @deprecated Use `factory.createJSDocTypeTag` or the factory supplied by your transformation context instead. */
    const createJSDocTypeTag: (tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocTypeTag;
    /** @deprecated Use `factory.createJSDocReturnTag` or the factory supplied by your transformation context instead. */
    const createJSDocReturnTag: (tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocReturnTag;
    /** @deprecated Use `factory.createJSDocThisTag` or the factory supplied by your transformation context instead. */
    const createJSDocThisTag: (tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocThisTag;
    /** @deprecated Use `factory.createJSDocComment` or the factory supplied by your transformation context instead. */
    const createJSDocComment: (comment?: string | NodeArray<JSDocComment> | undefined, tags?: readonly JSDocTag[] | undefined) => JSDoc;
    /** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
    const createJSDocParameterTag: (tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression | undefined, isNameFirst?: boolean | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocParameterTag;
    /** @deprecated Use `factory.createJSDocClassTag` or the factory supplied by your transformation context instead. */
    const createJSDocClassTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocClassTag;
    /** @deprecated Use `factory.createJSDocAugmentsTag` or the factory supplied by your transformation context instead. */
    const createJSDocAugmentsTag: (tagName: Identifier | undefined, className: ExpressionWithTypeArguments & {
        readonly expression: Identifier | PropertyAccessEntityNameExpression;
    }, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocAugmentsTag;
    /** @deprecated Use `factory.createJSDocEnumTag` or the factory supplied by your transformation context instead. */
    const createJSDocEnumTag: (tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocEnumTag;
    /** @deprecated Use `factory.createJSDocTemplateTag` or the factory supplied by your transformation context instead. */
    const createJSDocTemplateTag: (tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment?: string | NodeArray<JSDocComment> | undefined) => JSDocTemplateTag;
    /** @deprecated Use `factory.createJSDocTypedefTag` or the factory supplied by your transformation context instead. */
    const createJSDocTypedefTag: (tagName: Identifier | undefined, typeExpression?: JSDocTypeLiteral | JSDocTypeExpression | undefined, fullName?: Identifier | JSDocNamespaceDeclaration | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocTypedefTag;
    /** @deprecated Use `factory.createJSDocCallbackTag` or the factory supplied by your transformation context instead. */
    const createJSDocCallbackTag: (tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier | JSDocNamespaceDeclaration | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocCallbackTag;
    /** @deprecated Use `factory.createJSDocSignature` or the factory supplied by your transformation context instead. */
    const createJSDocSignature: (typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag | undefined) => JSDocSignature;
    /** @deprecated Use `factory.createJSDocPropertyTag` or the factory supplied by your transformation context instead. */
    const createJSDocPropertyTag: (tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression | undefined, isNameFirst?: boolean | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocPropertyTag;
    /** @deprecated Use `factory.createJSDocTypeLiteral` or the factory supplied by your transformation context instead. */
    const createJSDocTypeLiteral: (jsDocPropertyTags?: readonly JSDocPropertyLikeTag[] | undefined, isArrayType?: boolean | undefined) => JSDocTypeLiteral;
    /** @deprecated Use `factory.createJSDocImplementsTag` or the factory supplied by your transformation context instead. */
    const createJSDocImplementsTag: (tagName: Identifier | undefined, className: ExpressionWithTypeArguments & {
        readonly expression: Identifier | PropertyAccessEntityNameExpression;
    }, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocImplementsTag;
    /** @deprecated Use `factory.createJSDocAuthorTag` or the factory supplied by your transformation context instead. */
    const createJSDocAuthorTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocAuthorTag;
    /** @deprecated Use `factory.createJSDocPublicTag` or the factory supplied by your transformation context instead. */
    const createJSDocPublicTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocPublicTag;
    /** @deprecated Use `factory.createJSDocPrivateTag` or the factory supplied by your transformation context instead. */
    const createJSDocPrivateTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocPrivateTag;
    /** @deprecated Use `factory.createJSDocProtectedTag` or the factory supplied by your transformation context instead. */
    const createJSDocProtectedTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocProtectedTag;
    /** @deprecated Use `factory.createJSDocReadonlyTag` or the factory supplied by your transformation context instead. */
    const createJSDocReadonlyTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocReadonlyTag;
    /** @deprecated Use `factory.createJSDocUnknownTag` or the factory supplied by your transformation context instead. */
    const createJSDocTag: (tagName: Identifier, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocUnknownTag;
    /** @deprecated Use `factory.createJsxElement` or the factory supplied by your transformation context instead. */
    const createJsxElement: (openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement) => JsxElement;
    /** @deprecated Use `factory.updateJsxElement` or the factory supplied by your transformation context instead. */
    const updateJsxElement: (node: JsxElement, openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement) => JsxElement;
    /** @deprecated Use `factory.createJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
    const createJsxSelfClosingElement: (tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) => JsxSelfClosingElement;
    /** @deprecated Use `factory.updateJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
    const updateJsxSelfClosingElement: (node: JsxSelfClosingElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) => JsxSelfClosingElement;
    /** @deprecated Use `factory.createJsxOpeningElement` or the factory supplied by your transformation context instead. */
    const createJsxOpeningElement: (tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) => JsxOpeningElement;
    /** @deprecated Use `factory.updateJsxOpeningElement` or the factory supplied by your transformation context instead. */
    const updateJsxOpeningElement: (node: JsxOpeningElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) => JsxOpeningElement;
    /** @deprecated Use `factory.createJsxClosingElement` or the factory supplied by your transformation context instead. */
    const createJsxClosingElement: (tagName: JsxTagNameExpression) => JsxClosingElement;
    /** @deprecated Use `factory.updateJsxClosingElement` or the factory supplied by your transformation context instead. */
    const updateJsxClosingElement: (node: JsxClosingElement, tagName: JsxTagNameExpression) => JsxClosingElement;
    /** @deprecated Use `factory.createJsxFragment` or the factory supplied by your transformation context instead. */
    const createJsxFragment: (openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) => JsxFragment;
    /** @deprecated Use `factory.createJsxText` or the factory supplied by your transformation context instead. */
    const createJsxText: (text: string, containsOnlyTriviaWhiteSpaces?: boolean | undefined) => JsxText;
    /** @deprecated Use `factory.updateJsxText` or the factory supplied by your transformation context instead. */
    const updateJsxText: (node: JsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean | undefined) => JsxText;
    /** @deprecated Use `factory.createJsxOpeningFragment` or the factory supplied by your transformation context instead. */
    const createJsxOpeningFragment: () => JsxOpeningFragment;
    /** @deprecated Use `factory.createJsxJsxClosingFragment` or the factory supplied by your transformation context instead. */
    const createJsxJsxClosingFragment: () => JsxClosingFragment;
    /** @deprecated Use `factory.updateJsxFragment` or the factory supplied by your transformation context instead. */
    const updateJsxFragment: (node: JsxFragment, openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) => JsxFragment;
    /** @deprecated Use `factory.createJsxAttribute` or the factory supplied by your transformation context instead. */
    const createJsxAttribute: (name: Identifier, initializer: JsxAttributeValue | undefined) => JsxAttribute;
    /** @deprecated Use `factory.updateJsxAttribute` or the factory supplied by your transformation context instead. */
    const updateJsxAttribute: (node: JsxAttribute, name: Identifier, initializer: JsxAttributeValue | undefined) => JsxAttribute;
    /** @deprecated Use `factory.createJsxAttributes` or the factory supplied by your transformation context instead. */
    const createJsxAttributes: (properties: readonly JsxAttributeLike[]) => JsxAttributes;
    /** @deprecated Use `factory.updateJsxAttributes` or the factory supplied by your transformation context instead. */
    const updateJsxAttributes: (node: JsxAttributes, properties: readonly JsxAttributeLike[]) => JsxAttributes;
    /** @deprecated Use `factory.createJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
    const createJsxSpreadAttribute: (expression: Expression) => JsxSpreadAttribute;
    /** @deprecated Use `factory.updateJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
    const updateJsxSpreadAttribute: (node: JsxSpreadAttribute, expression: Expression) => JsxSpreadAttribute;
    /** @deprecated Use `factory.createJsxExpression` or the factory supplied by your transformation context instead. */
    const createJsxExpression: (dotDotDotToken: DotDotDotToken | undefined, expression: Expression | undefined) => JsxExpression;
    /** @deprecated Use `factory.updateJsxExpression` or the factory supplied by your transformation context instead. */
    const updateJsxExpression: (node: JsxExpression, expression: Expression | undefined) => JsxExpression;
    /** @deprecated Use `factory.createCaseClause` or the factory supplied by your transformation context instead. */
    const createCaseClause: (expression: Expression, statements: readonly Statement[]) => CaseClause;
    /** @deprecated Use `factory.updateCaseClause` or the factory supplied by your transformation context instead. */
    const updateCaseClause: (node: CaseClause, expression: Expression, statements: readonly Statement[]) => CaseClause;
    /** @deprecated Use `factory.createDefaultClause` or the factory supplied by your transformation context instead. */
    const createDefaultClause: (statements: readonly Statement[]) => DefaultClause;
    /** @deprecated Use `factory.updateDefaultClause` or the factory supplied by your transformation context instead. */
    const updateDefaultClause: (node: DefaultClause, statements: readonly Statement[]) => DefaultClause;
    /** @deprecated Use `factory.createHeritageClause` or the factory supplied by your transformation context instead. */
    const createHeritageClause: (token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword, types: readonly ExpressionWithTypeArguments[]) => HeritageClause;
    /** @deprecated Use `factory.updateHeritageClause` or the factory supplied by your transformation context instead. */
    const updateHeritageClause: (node: HeritageClause, types: readonly ExpressionWithTypeArguments[]) => HeritageClause;
    /** @deprecated Use `factory.createCatchClause` or the factory supplied by your transformation context instead. */
    const createCatchClause: (variableDeclaration: string | VariableDeclaration | BindingName | undefined, block: Block) => CatchClause;
    /** @deprecated Use `factory.updateCatchClause` or the factory supplied by your transformation context instead. */
    const updateCatchClause: (node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block) => CatchClause;
    /** @deprecated Use `factory.createPropertyAssignment` or the factory supplied by your transformation context instead. */
    const createPropertyAssignment: (name: string | PropertyName, initializer: Expression) => PropertyAssignment;
    /** @deprecated Use `factory.updatePropertyAssignment` or the factory supplied by your transformation context instead. */
    const updatePropertyAssignment: (node: PropertyAssignment, name: PropertyName, initializer: Expression) => PropertyAssignment;
    /** @deprecated Use `factory.createShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
    const createShorthandPropertyAssignment: (name: string | Identifier, objectAssignmentInitializer?: Expression | undefined) => ShorthandPropertyAssignment;
    /** @deprecated Use `factory.updateShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
    const updateShorthandPropertyAssignment: (node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined) => ShorthandPropertyAssignment;
    /** @deprecated Use `factory.createSpreadAssignment` or the factory supplied by your transformation context instead. */
    const createSpreadAssignment: (expression: Expression) => SpreadAssignment;
    /** @deprecated Use `factory.updateSpreadAssignment` or the factory supplied by your transformation context instead. */
    const updateSpreadAssignment: (node: SpreadAssignment, expression: Expression) => SpreadAssignment;
    /** @deprecated Use `factory.createEnumMember` or the factory supplied by your transformation context instead. */
    const createEnumMember: (name: string | PropertyName, initializer?: Expression | undefined) => EnumMember;
    /** @deprecated Use `factory.updateEnumMember` or the factory supplied by your transformation context instead. */
    const updateEnumMember: (node: EnumMember, name: PropertyName, initializer: Expression | undefined) => EnumMember;
    /** @deprecated Use `factory.updateSourceFile` or the factory supplied by your transformation context instead. */
    const updateSourceFileNode: (node: SourceFile, statements: readonly Statement[], isDeclarationFile?: boolean | undefined, referencedFiles?: readonly FileReference[] | undefined, typeReferences?: readonly FileReference[] | undefined, hasNoDefaultLib?: boolean | undefined, libReferences?: readonly FileReference[] | undefined) => SourceFile;
    /** @deprecated Use `factory.createNotEmittedStatement` or the factory supplied by your transformation context instead. */
    const createNotEmittedStatement: (original: Node) => NotEmittedStatement;
    /** @deprecated Use `factory.createPartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
    const createPartiallyEmittedExpression: (expression: Expression, original?: Node | undefined) => PartiallyEmittedExpression;
    /** @deprecated Use `factory.updatePartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
    const updatePartiallyEmittedExpression: (node: PartiallyEmittedExpression, expression: Expression) => PartiallyEmittedExpression;
    /** @deprecated Use `factory.createCommaListExpression` or the factory supplied by your transformation context instead. */
    const createCommaList: (elements: readonly Expression[]) => CommaListExpression;
    /** @deprecated Use `factory.updateCommaListExpression` or the factory supplied by your transformation context instead. */
    const updateCommaList: (node: CommaListExpression, elements: readonly Expression[]) => CommaListExpression;
    /** @deprecated Use `factory.createBundle` or the factory supplied by your transformation context instead. */
    const createBundle: (sourceFiles: readonly SourceFile[], prepends?: readonly (UnparsedSource | InputFiles)[] | undefined) => Bundle;
    /** @deprecated Use `factory.updateBundle` or the factory supplied by your transformation context instead. */
    const updateBundle: (node: Bundle, sourceFiles: readonly SourceFile[], prepends?: readonly (UnparsedSource | InputFiles)[] | undefined) => Bundle;
    /** @deprecated Use `factory.createImmediatelyInvokedFunctionExpression` or the factory supplied by your transformation context instead. */
    const createImmediatelyInvokedFunctionExpression: {
        (statements: readonly Statement[]): CallExpression;
        (statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
    };
    /** @deprecated Use `factory.createImmediatelyInvokedArrowFunction` or the factory supplied by your transformation context instead. */
    const createImmediatelyInvokedArrowFunction: {
        (statements: readonly Statement[]): CallExpression;
        (statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
    };
    /** @deprecated Use `factory.createVoidZero` or the factory supplied by your transformation context instead. */
    const createVoidZero: () => VoidExpression;
    /** @deprecated Use `factory.createExportDefault` or the factory supplied by your transformation context instead. */
    const createExportDefault: (expression: Expression) => ExportAssignment;
    /** @deprecated Use `factory.createExternalModuleExport` or the factory supplied by your transformation context instead. */
    const createExternalModuleExport: (exportName: Identifier) => ExportDeclaration;
    /** @deprecated Use `factory.createNamespaceExport` or the factory supplied by your transformation context instead. */
    const createNamespaceExport: (name: Identifier) => NamespaceExport;
    /** @deprecated Use `factory.updateNamespaceExport` or the factory supplied by your transformation context instead. */
    const updateNamespaceExport: (node: NamespaceExport, name: Identifier) => NamespaceExport;
    /** @deprecated Use `factory.createToken` or the factory supplied by your transformation context instead. */
    const createToken: <TKind extends SyntaxKind>(kind: TKind) => Token<TKind>;
    /** @deprecated Use `factory.createIdentifier` or the factory supplied by your transformation context instead. */
    const createIdentifier: (text: string) => Identifier;
    /** @deprecated Use `factory.createTempVariable` or the factory supplied by your transformation context instead. */
    const createTempVariable: (recordTempVariable: ((node: Identifier) => void) | undefined) => Identifier;
    /** @deprecated Use `factory.getGeneratedNameForNode` or the factory supplied by your transformation context instead. */
    const getGeneratedNameForNode: (node: Node | undefined) => Identifier;
    /** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic)` or the factory supplied by your transformation context instead. */
    const createOptimisticUniqueName: (text: string) => Identifier;
    /** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel)` or the factory supplied by your transformation context instead. */
    const createFileLevelUniqueName: (text: string) => Identifier;
    /** @deprecated Use `factory.createIndexSignature` or the factory supplied by your transformation context instead. */
    const createIndexSignature: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode) => IndexSignatureDeclaration;
    /** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
    const createTypePredicateNode: (parameterName: Identifier | ThisTypeNode | string, type: TypeNode) => TypePredicateNode;
    /** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
    const updateTypePredicateNode: (node: TypePredicateNode, parameterName: Identifier | ThisTypeNode, type: TypeNode) => TypePredicateNode;
    /** @deprecated Use `factory.createStringLiteral`, `factory.createStringLiteralFromNode`, `factory.createNumericLiteral`, `factory.createBigIntLiteral`, `factory.createTrue`, `factory.createFalse`, or the factory supplied by your transformation context instead. */
    const createLiteral: {
        (value: string | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier): StringLiteral;
        (value: number | PseudoBigInt): NumericLiteral;
        (value: boolean): BooleanLiteral;
        (value: string | number | PseudoBigInt | boolean): PrimaryExpression;
    };
    /** @deprecated Use `factory.createMethodSignature` or the factory supplied by your transformation context instead. */
    const createMethodSignature: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined) => MethodSignature;
    /** @deprecated Use `factory.updateMethodSignature` or the factory supplied by your transformation context instead. */
    const updateMethodSignature: (node: MethodSignature, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined, name: PropertyName, questionToken: QuestionToken | undefined) => MethodSignature;
    /** @deprecated Use `factory.createTypeOperatorNode` or the factory supplied by your transformation context instead. */
    const createTypeOperatorNode: {
        (type: TypeNode): TypeOperatorNode;
        (operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode;
    };
    /** @deprecated Use `factory.createTaggedTemplate` or the factory supplied by your transformation context instead. */
    const createTaggedTemplate: {
        (tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
        (tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    };
    /** @deprecated Use `factory.updateTaggedTemplate` or the factory supplied by your transformation context instead. */
    const updateTaggedTemplate: {
        (node: TaggedTemplateExpression, tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
        (node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    };
    /** @deprecated Use `factory.updateBinary` or the factory supplied by your transformation context instead. */
    const updateBinary: (node: BinaryExpression, left: Expression, right: Expression, operator?: BinaryOperator | BinaryOperatorToken) => BinaryExpression;
    /** @deprecated Use `factory.createConditional` or the factory supplied by your transformation context instead. */
    const createConditional: {
        (condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression;
        (condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
    };
    /** @deprecated Use `factory.createYield` or the factory supplied by your transformation context instead. */
    const createYield: {
        (expression?: Expression | undefined): YieldExpression;
        (asteriskToken: AsteriskToken | undefined, expression: Expression): YieldExpression;
    };
    /** @deprecated Use `factory.createClassExpression` or the factory supplied by your transformation context instead. */
    const createClassExpression: (modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]) => ClassExpression;
    /** @deprecated Use `factory.updateClassExpression` or the factory supplied by your transformation context instead. */
    const updateClassExpression: (node: ClassExpression, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]) => ClassExpression;
    /** @deprecated Use `factory.createPropertySignature` or the factory supplied by your transformation context instead. */
    const createPropertySignature: (modifiers: readonly Modifier[] | undefined, name: PropertyName | string, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer?: Expression | undefined) => PropertySignature;
    /** @deprecated Use `factory.updatePropertySignature` or the factory supplied by your transformation context instead. */
    const updatePropertySignature: (node: PropertySignature, modifiers: readonly Modifier[] | undefined, name: PropertyName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined) => PropertySignature;
    /** @deprecated Use `factory.createExpressionWithTypeArguments` or the factory supplied by your transformation context instead. */
    const createExpressionWithTypeArguments: (typeArguments: readonly TypeNode[] | undefined, expression: Expression) => ExpressionWithTypeArguments;
    /** @deprecated Use `factory.updateExpressionWithTypeArguments` or the factory supplied by your transformation context instead. */
    const updateExpressionWithTypeArguments: (node: ExpressionWithTypeArguments, typeArguments: readonly TypeNode[] | undefined, expression: Expression) => ExpressionWithTypeArguments;
    /** @deprecated Use `factory.createArrowFunction` or the factory supplied by your transformation context instead. */
    const createArrowFunction: {
        (modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken | undefined, body: ConciseBody): ArrowFunction;
        (modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
    };
    /** @deprecated Use `factory.updateArrowFunction` or the factory supplied by your transformation context instead. */
    const updateArrowFunction: {
        (node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody): ArrowFunction;
        (node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
    };
    /** @deprecated Use `factory.createVariableDeclaration` or the factory supplied by your transformation context instead. */
    const createVariableDeclaration: {
        (name: string | BindingName, type?: TypeNode | undefined, initializer?: Expression | undefined): VariableDeclaration;
        (name: string | BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    };
    /** @deprecated Use `factory.updateVariableDeclaration` or the factory supplied by your transformation context instead. */
    const updateVariableDeclaration: {
        (node: VariableDeclaration, name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
        (node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    };
    /** @deprecated Use `factory.createImportClause` or the factory supplied by your transformation context instead. */
    const createImportClause: (name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly?: any) => ImportClause;
    /** @deprecated Use `factory.updateImportClause` or the factory supplied by your transformation context instead. */
    const updateImportClause: (node: ImportClause, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly: boolean) => ImportClause;
    /** @deprecated Use `factory.createExportDeclaration` or the factory supplied by your transformation context instead. */
    const createExportDeclaration: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression | undefined, isTypeOnly?: any) => ExportDeclaration;
    /** @deprecated Use `factory.updateExportDeclaration` or the factory supplied by your transformation context instead. */
    const updateExportDeclaration: (node: ExportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, isTypeOnly: boolean) => ExportDeclaration;
    /** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
    const createJSDocParamTag: (name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression | undefined, comment?: string | undefined) => JSDocParameterTag;
    /** @deprecated Use `factory.createComma` or the factory supplied by your transformation context instead. */
    const createComma: (left: Expression, right: Expression) => Expression;
    /** @deprecated Use `factory.createLessThan` or the factory supplied by your transformation context instead. */
    const createLessThan: (left: Expression, right: Expression) => Expression;
    /** @deprecated Use `factory.createAssignment` or the factory supplied by your transformation context instead. */
    const createAssignment: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createStrictEquality` or the factory supplied by your transformation context instead. */
    const createStrictEquality: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createStrictInequality` or the factory supplied by your transformation context instead. */
    const createStrictInequality: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createAdd` or the factory supplied by your transformation context instead. */
    const createAdd: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createSubtract` or the factory supplied by your transformation context instead. */
    const createSubtract: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createLogicalAnd` or the factory supplied by your transformation context instead. */
    const createLogicalAnd: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createLogicalOr` or the factory supplied by your transformation context instead. */
    const createLogicalOr: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createPostfixIncrement` or the factory supplied by your transformation context instead. */
    const createPostfixIncrement: (operand: Expression) => PostfixUnaryExpression;
    /** @deprecated Use `factory.createLogicalNot` or the factory supplied by your transformation context instead. */
    const createLogicalNot: (operand: Expression) => PrefixUnaryExpression;
    /** @deprecated Use an appropriate `factory` method instead. */
    const createNode: (kind: SyntaxKind, pos?: any, end?: any) => Node;
    /**
     * Creates a shallow, memberwise clone of a node ~for mutation~ with its `pos`, `end`, and `parent` set.
     *
     * NOTE: It is unsafe to change any properties of a `Node` that relate to its AST children, as those changes won't be
     * captured with respect to transformations.
     *
     * @deprecated Use an appropriate `factory.update...` method instead, use `setCommentRange` or `setSourceMapRange`, and avoid setting `parent`.
     */
    const getMutableClone: <T extends Node>(node: T) => T;
}
declare namespace ts {
    /** @deprecated Use `isTypeAssertionExpression` instead. */
    const isTypeAssertion: (node: Node) => node is TypeAssertion;
}
declare namespace ts {
    /**
     * @deprecated Use `ts.ReadonlyESMap<K, V>` instead.
     */
    interface ReadonlyMap<T> extends ReadonlyESMap<string, T> {
    }
    /**
     * @deprecated Use `ts.ESMap<K, V>` instead.
     */
    interface Map<T> extends ESMap<string, T> {
    }
}
declare namespace ts {
    /**
     * @deprecated Use `isMemberName` instead.
     */
    const isIdentifierOrPrivateIdentifier: (node: Node) => node is MemberName;
}
declare namespace ts {
    interface NodeFactory {
        /** @deprecated Use the overload that accepts 'modifiers' */
        createConstructorTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode;
        /** @deprecated Use the overload that accepts 'modifiers' */
        updateConstructorTypeNode(node: ConstructorTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode): ConstructorTypeNode;
    }
}
declare namespace ts {
    interface NodeFactory {
        createImportTypeNode(argument: TypeNode, assertions?: ImportTypeAssertionContainer, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode;
        /** @deprecated Use the overload that accepts 'assertions' */
        createImportTypeNode(argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode;
        /** @deprecated Use the overload that accepts 'assertions' */
        updateImportTypeNode(node: ImportTypeNode, argument: TypeNode, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean): ImportTypeNode;
    }
}
declare namespace ts {
    interface NodeFactory {
        /** @deprecated Use the overload that accepts 'modifiers' */
        createTypeParameterDeclaration(name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration;
        /** @deprecated Use the overload that accepts 'modifiers' */
        updateTypeParameterDeclaration(node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration;
    }
}
declare namespace ts {
    interface Node {
        /**
         * @deprecated `decorators` has been removed from `Node` and merged with `modifiers` on the `Node` subtypes that support them.
         * Use `ts.canHaveDecorators()` to test whether a `Node` can have decorators.
         * Use `ts.getDecorators()` to get the decorators of a `Node`.
         *
         * For example:
         * ```ts
         * const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
         * ```
         */
        readonly decorators?: undefined;
        /**
         * @deprecated `modifiers` has been removed from `Node` and moved to the `Node` subtypes that support them.
         * Use `ts.canHaveModifiers()` to test whether a `Node` can have modifiers.
         * Use `ts.getModifiers()` to get the modifiers of a `Node`.
         *
         * For example:
         * ```ts
         * const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined;
         * ```
         */
        readonly modifiers?: NodeArray<ModifierLike> | undefined;
    }
    interface PropertySignature {
        /** @deprecated A property signature cannot have an initializer */
        readonly initializer?: Expression | undefined;
    }
    interface PropertyAssignment {
        /** @deprecated A property assignment cannot have a question token */
        readonly questionToken?: QuestionToken | undefined;
        /** @deprecated A property assignment cannot have an exclamation token */
        readonly exclamationToken?: ExclamationToken | undefined;
    }
    interface ShorthandPropertyAssignment {
        /** @deprecated A shorthand property assignment cannot have modifiers */
        readonly modifiers?: NodeArray<Modifier> | undefined;
        /** @deprecated A shorthand property assignment cannot have a question token */
        readonly questionToken?: QuestionToken | undefined;
        /** @deprecated A shorthand property assignment cannot have an exclamation token */
        readonly exclamationToken?: ExclamationToken | undefined;
    }
    interface FunctionTypeNode {
        /** @deprecated A function type cannot have modifiers */
        readonly modifiers?: NodeArray<Modifier> | undefined;
    }
    interface NodeFactory {
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createParameterDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateParameterDeclaration(node: ParameterDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createPropertyDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updatePropertyDeclaration(node: PropertyDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createMethodDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateMethodDeclaration(node: MethodDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        /**
         * @deprecated This node does not support Decorators. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createConstructorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        /**
         * @deprecated This node does not support Decorators. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateConstructorDeclaration(node: ConstructorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createGetAccessorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateGetAccessorDeclaration(node: GetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createSetAccessorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateSetAccessorDeclaration(node: SetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createIndexSignature(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        /**
         * @deprecated Decorators and modifiers are no longer supported for this function. Callers should use an overload that does not accept the `decorators` and `modifiers` parameters.
         */
        updateIndexSignature(node: IndexSignatureDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        /**
         * @deprecated Decorators and modifiers are no longer supported for this function. Callers should use an overload that does not accept the `decorators` and `modifiers` parameters.
         */
        createClassStaticBlockDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createClassExpression(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassExpression(node: ClassExpression, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createFunctionDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateFunctionDeclaration(node: FunctionDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createClassDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassDeclaration(node: ClassDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createInterfaceDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateInterfaceDeclaration(node: InterfaceDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createTypeAliasDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateTypeAliasDeclaration(node: TypeAliasDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createEnumDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, members: readonly EnumMember[]): EnumDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateEnumDeclaration(node: EnumDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createModuleDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags): ModuleDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateModuleDeclaration(node: ModuleDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createImportEqualsDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateImportEqualsDeclaration(node: ImportEqualsDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createImportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause?: AssertClause): ImportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateImportDeclaration(node: ImportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createExportAssignment(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateExportAssignment(node: ExportAssignment, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, expression: Expression): ExportAssignment;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createExportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression, assertClause?: AssertClause): ExportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateExportDeclaration(node: ExportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, assertClause: AssertClause | undefined): ExportDeclaration;
    }
}
//# sourceMappingURL=deprecatedCompat.d.ts.map