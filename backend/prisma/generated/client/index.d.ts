
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model TileOwnership
 * 
 */
export type TileOwnership = $Result.DefaultSelection<Prisma.$TileOwnershipPayload>
/**
 * Model TileHistory
 * 
 */
export type TileHistory = $Result.DefaultSelection<Prisma.$TileHistoryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tileOwnership`: Exposes CRUD operations for the **TileOwnership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TileOwnerships
    * const tileOwnerships = await prisma.tileOwnership.findMany()
    * ```
    */
  get tileOwnership(): Prisma.TileOwnershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tileHistory`: Exposes CRUD operations for the **TileHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TileHistories
    * const tileHistories = await prisma.tileHistory.findMany()
    * ```
    */
  get tileHistory(): Prisma.TileHistoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Activity: 'Activity',
    TileOwnership: 'TileOwnership',
    TileHistory: 'TileHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "activity" | "tileOwnership" | "tileHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      TileOwnership: {
        payload: Prisma.$TileOwnershipPayload<ExtArgs>
        fields: Prisma.TileOwnershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TileOwnershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileOwnershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TileOwnershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileOwnershipPayload>
          }
          findFirst: {
            args: Prisma.TileOwnershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileOwnershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TileOwnershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileOwnershipPayload>
          }
          findMany: {
            args: Prisma.TileOwnershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileOwnershipPayload>[]
          }
          create: {
            args: Prisma.TileOwnershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileOwnershipPayload>
          }
          createMany: {
            args: Prisma.TileOwnershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TileOwnershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileOwnershipPayload>[]
          }
          delete: {
            args: Prisma.TileOwnershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileOwnershipPayload>
          }
          update: {
            args: Prisma.TileOwnershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileOwnershipPayload>
          }
          deleteMany: {
            args: Prisma.TileOwnershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TileOwnershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TileOwnershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileOwnershipPayload>[]
          }
          upsert: {
            args: Prisma.TileOwnershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileOwnershipPayload>
          }
          aggregate: {
            args: Prisma.TileOwnershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTileOwnership>
          }
          groupBy: {
            args: Prisma.TileOwnershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<TileOwnershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.TileOwnershipCountArgs<ExtArgs>
            result: $Utils.Optional<TileOwnershipCountAggregateOutputType> | number
          }
        }
      }
      TileHistory: {
        payload: Prisma.$TileHistoryPayload<ExtArgs>
        fields: Prisma.TileHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TileHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TileHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileHistoryPayload>
          }
          findFirst: {
            args: Prisma.TileHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TileHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileHistoryPayload>
          }
          findMany: {
            args: Prisma.TileHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileHistoryPayload>[]
          }
          create: {
            args: Prisma.TileHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileHistoryPayload>
          }
          createMany: {
            args: Prisma.TileHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TileHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileHistoryPayload>[]
          }
          delete: {
            args: Prisma.TileHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileHistoryPayload>
          }
          update: {
            args: Prisma.TileHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileHistoryPayload>
          }
          deleteMany: {
            args: Prisma.TileHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TileHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TileHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileHistoryPayload>[]
          }
          upsert: {
            args: Prisma.TileHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileHistoryPayload>
          }
          aggregate: {
            args: Prisma.TileHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTileHistory>
          }
          groupBy: {
            args: Prisma.TileHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<TileHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.TileHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<TileHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    activity?: ActivityOmit
    tileOwnership?: TileOwnershipOmit
    tileHistory?: TileHistoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    activities: number
    tiles: number
    historyCaptured: number
    historyLost: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | UserCountOutputTypeCountActivitiesArgs
    tiles?: boolean | UserCountOutputTypeCountTilesArgs
    historyCaptured?: boolean | UserCountOutputTypeCountHistoryCapturedArgs
    historyLost?: boolean | UserCountOutputTypeCountHistoryLostArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TileOwnershipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHistoryCapturedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TileHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHistoryLostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TileHistoryWhereInput
  }


  /**
   * Count Type ActivityCountOutputType
   */

  export type ActivityCountOutputType = {
    tileHistory: number
  }

  export type ActivityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tileHistory?: boolean | ActivityCountOutputTypeCountTileHistoryArgs
  }

  // Custom InputTypes
  /**
   * ActivityCountOutputType without action
   */
  export type ActivityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCountOutputType
     */
    select?: ActivityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ActivityCountOutputType without action
   */
  export type ActivityCountOutputTypeCountTileHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TileHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    stravaAthleteId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    stravaAthleteId: bigint | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    stravaAthleteId: bigint | null
    username: string | null
    firstname: string | null
    lastname: string | null
    profile: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    stravaAthleteId: bigint | null
    username: string | null
    firstname: string | null
    lastname: string | null
    profile: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    stravaAthleteId: number
    username: number
    firstname: number
    lastname: number
    profile: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    stravaAthleteId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    stravaAthleteId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    stravaAthleteId?: true
    username?: true
    firstname?: true
    lastname?: true
    profile?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    stravaAthleteId?: true
    username?: true
    firstname?: true
    lastname?: true
    profile?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    stravaAthleteId?: true
    username?: true
    firstname?: true
    lastname?: true
    profile?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    stravaAthleteId: bigint
    username: string | null
    firstname: string | null
    lastname: string | null
    profile: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stravaAthleteId?: boolean
    username?: boolean
    firstname?: boolean
    lastname?: boolean
    profile?: boolean
    createdAt?: boolean
    activities?: boolean | User$activitiesArgs<ExtArgs>
    tiles?: boolean | User$tilesArgs<ExtArgs>
    historyCaptured?: boolean | User$historyCapturedArgs<ExtArgs>
    historyLost?: boolean | User$historyLostArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stravaAthleteId?: boolean
    username?: boolean
    firstname?: boolean
    lastname?: boolean
    profile?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stravaAthleteId?: boolean
    username?: boolean
    firstname?: boolean
    lastname?: boolean
    profile?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    stravaAthleteId?: boolean
    username?: boolean
    firstname?: boolean
    lastname?: boolean
    profile?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stravaAthleteId" | "username" | "firstname" | "lastname" | "profile" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | User$activitiesArgs<ExtArgs>
    tiles?: boolean | User$tilesArgs<ExtArgs>
    historyCaptured?: boolean | User$historyCapturedArgs<ExtArgs>
    historyLost?: boolean | User$historyLostArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      tiles: Prisma.$TileOwnershipPayload<ExtArgs>[]
      historyCaptured: Prisma.$TileHistoryPayload<ExtArgs>[]
      historyLost: Prisma.$TileHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      stravaAthleteId: bigint
      username: string | null
      firstname: string | null
      lastname: string | null
      profile: string | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activities<T extends User$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tiles<T extends User$tilesArgs<ExtArgs> = {}>(args?: Subset<T, User$tilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    historyCaptured<T extends User$historyCapturedArgs<ExtArgs> = {}>(args?: Subset<T, User$historyCapturedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    historyLost<T extends User$historyLostArgs<ExtArgs> = {}>(args?: Subset<T, User$historyLostArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly stravaAthleteId: FieldRef<"User", 'BigInt'>
    readonly username: FieldRef<"User", 'String'>
    readonly firstname: FieldRef<"User", 'String'>
    readonly lastname: FieldRef<"User", 'String'>
    readonly profile: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.activities
   */
  export type User$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * User.tiles
   */
  export type User$tilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipInclude<ExtArgs> | null
    where?: TileOwnershipWhereInput
    orderBy?: TileOwnershipOrderByWithRelationInput | TileOwnershipOrderByWithRelationInput[]
    cursor?: TileOwnershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TileOwnershipScalarFieldEnum | TileOwnershipScalarFieldEnum[]
  }

  /**
   * User.historyCaptured
   */
  export type User$historyCapturedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    where?: TileHistoryWhereInput
    orderBy?: TileHistoryOrderByWithRelationInput | TileHistoryOrderByWithRelationInput[]
    cursor?: TileHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TileHistoryScalarFieldEnum | TileHistoryScalarFieldEnum[]
  }

  /**
   * User.historyLost
   */
  export type User$historyLostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    where?: TileHistoryWhereInput
    orderBy?: TileHistoryOrderByWithRelationInput | TileHistoryOrderByWithRelationInput[]
    cursor?: TileHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TileHistoryScalarFieldEnum | TileHistoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityAvgAggregateOutputType = {
    id: number | null
    stravaId: number | null
    userId: number | null
    distanceM: number | null
    movingTimeS: number | null
    startLat: number | null
    startLng: number | null
    endLat: number | null
    endLng: number | null
  }

  export type ActivitySumAggregateOutputType = {
    id: number | null
    stravaId: bigint | null
    userId: number | null
    distanceM: number | null
    movingTimeS: number | null
    startLat: number | null
    startLng: number | null
    endLat: number | null
    endLng: number | null
  }

  export type ActivityMinAggregateOutputType = {
    id: number | null
    stravaId: bigint | null
    userId: number | null
    source: string | null
    name: string | null
    distanceM: number | null
    movingTimeS: number | null
    startLat: number | null
    startLng: number | null
    endLat: number | null
    endLng: number | null
    polyline: string | null
    captured: boolean | null
    createdAt: Date | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: number | null
    stravaId: bigint | null
    userId: number | null
    source: string | null
    name: string | null
    distanceM: number | null
    movingTimeS: number | null
    startLat: number | null
    startLng: number | null
    endLat: number | null
    endLng: number | null
    polyline: string | null
    captured: boolean | null
    createdAt: Date | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    stravaId: number
    userId: number
    source: number
    name: number
    distanceM: number
    movingTimeS: number
    startLat: number
    startLng: number
    endLat: number
    endLng: number
    polyline: number
    captured: number
    createdAt: number
    _all: number
  }


  export type ActivityAvgAggregateInputType = {
    id?: true
    stravaId?: true
    userId?: true
    distanceM?: true
    movingTimeS?: true
    startLat?: true
    startLng?: true
    endLat?: true
    endLng?: true
  }

  export type ActivitySumAggregateInputType = {
    id?: true
    stravaId?: true
    userId?: true
    distanceM?: true
    movingTimeS?: true
    startLat?: true
    startLng?: true
    endLat?: true
    endLng?: true
  }

  export type ActivityMinAggregateInputType = {
    id?: true
    stravaId?: true
    userId?: true
    source?: true
    name?: true
    distanceM?: true
    movingTimeS?: true
    startLat?: true
    startLng?: true
    endLat?: true
    endLng?: true
    polyline?: true
    captured?: true
    createdAt?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    stravaId?: true
    userId?: true
    source?: true
    name?: true
    distanceM?: true
    movingTimeS?: true
    startLat?: true
    startLng?: true
    endLat?: true
    endLng?: true
    polyline?: true
    captured?: true
    createdAt?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    stravaId?: true
    userId?: true
    source?: true
    name?: true
    distanceM?: true
    movingTimeS?: true
    startLat?: true
    startLng?: true
    endLat?: true
    endLng?: true
    polyline?: true
    captured?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _avg?: ActivityAvgAggregateInputType
    _sum?: ActivitySumAggregateInputType
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: number
    stravaId: bigint | null
    userId: number
    source: string
    name: string | null
    distanceM: number | null
    movingTimeS: number | null
    startLat: number | null
    startLng: number | null
    endLat: number | null
    endLng: number | null
    polyline: string | null
    captured: boolean
    createdAt: Date
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stravaId?: boolean
    userId?: boolean
    source?: boolean
    name?: boolean
    distanceM?: boolean
    movingTimeS?: boolean
    startLat?: boolean
    startLng?: boolean
    endLat?: boolean
    endLng?: boolean
    polyline?: boolean
    captured?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tileHistory?: boolean | Activity$tileHistoryArgs<ExtArgs>
    _count?: boolean | ActivityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stravaId?: boolean
    userId?: boolean
    source?: boolean
    name?: boolean
    distanceM?: boolean
    movingTimeS?: boolean
    startLat?: boolean
    startLng?: boolean
    endLat?: boolean
    endLng?: boolean
    polyline?: boolean
    captured?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stravaId?: boolean
    userId?: boolean
    source?: boolean
    name?: boolean
    distanceM?: boolean
    movingTimeS?: boolean
    startLat?: boolean
    startLng?: boolean
    endLat?: boolean
    endLng?: boolean
    polyline?: boolean
    captured?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    stravaId?: boolean
    userId?: boolean
    source?: boolean
    name?: boolean
    distanceM?: boolean
    movingTimeS?: boolean
    startLat?: boolean
    startLng?: boolean
    endLat?: boolean
    endLng?: boolean
    polyline?: boolean
    captured?: boolean
    createdAt?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stravaId" | "userId" | "source" | "name" | "distanceM" | "movingTimeS" | "startLat" | "startLng" | "endLat" | "endLng" | "polyline" | "captured" | "createdAt", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tileHistory?: boolean | Activity$tileHistoryArgs<ExtArgs>
    _count?: boolean | ActivityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      tileHistory: Prisma.$TileHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      stravaId: bigint | null
      userId: number
      source: string
      name: string | null
      distanceM: number | null
      movingTimeS: number | null
      startLat: number | null
      startLng: number | null
      endLat: number | null
      endLng: number | null
      polyline: string | null
      captured: boolean
      createdAt: Date
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tileHistory<T extends Activity$tileHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Activity$tileHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'Int'>
    readonly stravaId: FieldRef<"Activity", 'BigInt'>
    readonly userId: FieldRef<"Activity", 'Int'>
    readonly source: FieldRef<"Activity", 'String'>
    readonly name: FieldRef<"Activity", 'String'>
    readonly distanceM: FieldRef<"Activity", 'Float'>
    readonly movingTimeS: FieldRef<"Activity", 'Int'>
    readonly startLat: FieldRef<"Activity", 'Float'>
    readonly startLng: FieldRef<"Activity", 'Float'>
    readonly endLat: FieldRef<"Activity", 'Float'>
    readonly endLng: FieldRef<"Activity", 'Float'>
    readonly polyline: FieldRef<"Activity", 'String'>
    readonly captured: FieldRef<"Activity", 'Boolean'>
    readonly createdAt: FieldRef<"Activity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity.tileHistory
   */
  export type Activity$tileHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    where?: TileHistoryWhereInput
    orderBy?: TileHistoryOrderByWithRelationInput | TileHistoryOrderByWithRelationInput[]
    cursor?: TileHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TileHistoryScalarFieldEnum | TileHistoryScalarFieldEnum[]
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model TileOwnership
   */

  export type AggregateTileOwnership = {
    _count: TileOwnershipCountAggregateOutputType | null
    _avg: TileOwnershipAvgAggregateOutputType | null
    _sum: TileOwnershipSumAggregateOutputType | null
    _min: TileOwnershipMinAggregateOutputType | null
    _max: TileOwnershipMaxAggregateOutputType | null
  }

  export type TileOwnershipAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TileOwnershipSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TileOwnershipMinAggregateOutputType = {
    id: number | null
    userId: number | null
    tileId: string | null
    createdAt: Date | null
  }

  export type TileOwnershipMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    tileId: string | null
    createdAt: Date | null
  }

  export type TileOwnershipCountAggregateOutputType = {
    id: number
    userId: number
    tileId: number
    createdAt: number
    _all: number
  }


  export type TileOwnershipAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TileOwnershipSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TileOwnershipMinAggregateInputType = {
    id?: true
    userId?: true
    tileId?: true
    createdAt?: true
  }

  export type TileOwnershipMaxAggregateInputType = {
    id?: true
    userId?: true
    tileId?: true
    createdAt?: true
  }

  export type TileOwnershipCountAggregateInputType = {
    id?: true
    userId?: true
    tileId?: true
    createdAt?: true
    _all?: true
  }

  export type TileOwnershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TileOwnership to aggregate.
     */
    where?: TileOwnershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileOwnerships to fetch.
     */
    orderBy?: TileOwnershipOrderByWithRelationInput | TileOwnershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TileOwnershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileOwnerships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileOwnerships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TileOwnerships
    **/
    _count?: true | TileOwnershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TileOwnershipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TileOwnershipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TileOwnershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TileOwnershipMaxAggregateInputType
  }

  export type GetTileOwnershipAggregateType<T extends TileOwnershipAggregateArgs> = {
        [P in keyof T & keyof AggregateTileOwnership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTileOwnership[P]>
      : GetScalarType<T[P], AggregateTileOwnership[P]>
  }




  export type TileOwnershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TileOwnershipWhereInput
    orderBy?: TileOwnershipOrderByWithAggregationInput | TileOwnershipOrderByWithAggregationInput[]
    by: TileOwnershipScalarFieldEnum[] | TileOwnershipScalarFieldEnum
    having?: TileOwnershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TileOwnershipCountAggregateInputType | true
    _avg?: TileOwnershipAvgAggregateInputType
    _sum?: TileOwnershipSumAggregateInputType
    _min?: TileOwnershipMinAggregateInputType
    _max?: TileOwnershipMaxAggregateInputType
  }

  export type TileOwnershipGroupByOutputType = {
    id: number
    userId: number
    tileId: string
    createdAt: Date
    _count: TileOwnershipCountAggregateOutputType | null
    _avg: TileOwnershipAvgAggregateOutputType | null
    _sum: TileOwnershipSumAggregateOutputType | null
    _min: TileOwnershipMinAggregateOutputType | null
    _max: TileOwnershipMaxAggregateOutputType | null
  }

  type GetTileOwnershipGroupByPayload<T extends TileOwnershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TileOwnershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TileOwnershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TileOwnershipGroupByOutputType[P]>
            : GetScalarType<T[P], TileOwnershipGroupByOutputType[P]>
        }
      >
    >


  export type TileOwnershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tileId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tileOwnership"]>

  export type TileOwnershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tileId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tileOwnership"]>

  export type TileOwnershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tileId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tileOwnership"]>

  export type TileOwnershipSelectScalar = {
    id?: boolean
    userId?: boolean
    tileId?: boolean
    createdAt?: boolean
  }

  export type TileOwnershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "tileId" | "createdAt", ExtArgs["result"]["tileOwnership"]>
  export type TileOwnershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TileOwnershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TileOwnershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TileOwnershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TileOwnership"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      tileId: string
      createdAt: Date
    }, ExtArgs["result"]["tileOwnership"]>
    composites: {}
  }

  type TileOwnershipGetPayload<S extends boolean | null | undefined | TileOwnershipDefaultArgs> = $Result.GetResult<Prisma.$TileOwnershipPayload, S>

  type TileOwnershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TileOwnershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TileOwnershipCountAggregateInputType | true
    }

  export interface TileOwnershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TileOwnership'], meta: { name: 'TileOwnership' } }
    /**
     * Find zero or one TileOwnership that matches the filter.
     * @param {TileOwnershipFindUniqueArgs} args - Arguments to find a TileOwnership
     * @example
     * // Get one TileOwnership
     * const tileOwnership = await prisma.tileOwnership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TileOwnershipFindUniqueArgs>(args: SelectSubset<T, TileOwnershipFindUniqueArgs<ExtArgs>>): Prisma__TileOwnershipClient<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TileOwnership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TileOwnershipFindUniqueOrThrowArgs} args - Arguments to find a TileOwnership
     * @example
     * // Get one TileOwnership
     * const tileOwnership = await prisma.tileOwnership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TileOwnershipFindUniqueOrThrowArgs>(args: SelectSubset<T, TileOwnershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TileOwnershipClient<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TileOwnership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileOwnershipFindFirstArgs} args - Arguments to find a TileOwnership
     * @example
     * // Get one TileOwnership
     * const tileOwnership = await prisma.tileOwnership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TileOwnershipFindFirstArgs>(args?: SelectSubset<T, TileOwnershipFindFirstArgs<ExtArgs>>): Prisma__TileOwnershipClient<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TileOwnership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileOwnershipFindFirstOrThrowArgs} args - Arguments to find a TileOwnership
     * @example
     * // Get one TileOwnership
     * const tileOwnership = await prisma.tileOwnership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TileOwnershipFindFirstOrThrowArgs>(args?: SelectSubset<T, TileOwnershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__TileOwnershipClient<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TileOwnerships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileOwnershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TileOwnerships
     * const tileOwnerships = await prisma.tileOwnership.findMany()
     * 
     * // Get first 10 TileOwnerships
     * const tileOwnerships = await prisma.tileOwnership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tileOwnershipWithIdOnly = await prisma.tileOwnership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TileOwnershipFindManyArgs>(args?: SelectSubset<T, TileOwnershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TileOwnership.
     * @param {TileOwnershipCreateArgs} args - Arguments to create a TileOwnership.
     * @example
     * // Create one TileOwnership
     * const TileOwnership = await prisma.tileOwnership.create({
     *   data: {
     *     // ... data to create a TileOwnership
     *   }
     * })
     * 
     */
    create<T extends TileOwnershipCreateArgs>(args: SelectSubset<T, TileOwnershipCreateArgs<ExtArgs>>): Prisma__TileOwnershipClient<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TileOwnerships.
     * @param {TileOwnershipCreateManyArgs} args - Arguments to create many TileOwnerships.
     * @example
     * // Create many TileOwnerships
     * const tileOwnership = await prisma.tileOwnership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TileOwnershipCreateManyArgs>(args?: SelectSubset<T, TileOwnershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TileOwnerships and returns the data saved in the database.
     * @param {TileOwnershipCreateManyAndReturnArgs} args - Arguments to create many TileOwnerships.
     * @example
     * // Create many TileOwnerships
     * const tileOwnership = await prisma.tileOwnership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TileOwnerships and only return the `id`
     * const tileOwnershipWithIdOnly = await prisma.tileOwnership.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TileOwnershipCreateManyAndReturnArgs>(args?: SelectSubset<T, TileOwnershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TileOwnership.
     * @param {TileOwnershipDeleteArgs} args - Arguments to delete one TileOwnership.
     * @example
     * // Delete one TileOwnership
     * const TileOwnership = await prisma.tileOwnership.delete({
     *   where: {
     *     // ... filter to delete one TileOwnership
     *   }
     * })
     * 
     */
    delete<T extends TileOwnershipDeleteArgs>(args: SelectSubset<T, TileOwnershipDeleteArgs<ExtArgs>>): Prisma__TileOwnershipClient<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TileOwnership.
     * @param {TileOwnershipUpdateArgs} args - Arguments to update one TileOwnership.
     * @example
     * // Update one TileOwnership
     * const tileOwnership = await prisma.tileOwnership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TileOwnershipUpdateArgs>(args: SelectSubset<T, TileOwnershipUpdateArgs<ExtArgs>>): Prisma__TileOwnershipClient<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TileOwnerships.
     * @param {TileOwnershipDeleteManyArgs} args - Arguments to filter TileOwnerships to delete.
     * @example
     * // Delete a few TileOwnerships
     * const { count } = await prisma.tileOwnership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TileOwnershipDeleteManyArgs>(args?: SelectSubset<T, TileOwnershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TileOwnerships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileOwnershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TileOwnerships
     * const tileOwnership = await prisma.tileOwnership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TileOwnershipUpdateManyArgs>(args: SelectSubset<T, TileOwnershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TileOwnerships and returns the data updated in the database.
     * @param {TileOwnershipUpdateManyAndReturnArgs} args - Arguments to update many TileOwnerships.
     * @example
     * // Update many TileOwnerships
     * const tileOwnership = await prisma.tileOwnership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TileOwnerships and only return the `id`
     * const tileOwnershipWithIdOnly = await prisma.tileOwnership.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TileOwnershipUpdateManyAndReturnArgs>(args: SelectSubset<T, TileOwnershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TileOwnership.
     * @param {TileOwnershipUpsertArgs} args - Arguments to update or create a TileOwnership.
     * @example
     * // Update or create a TileOwnership
     * const tileOwnership = await prisma.tileOwnership.upsert({
     *   create: {
     *     // ... data to create a TileOwnership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TileOwnership we want to update
     *   }
     * })
     */
    upsert<T extends TileOwnershipUpsertArgs>(args: SelectSubset<T, TileOwnershipUpsertArgs<ExtArgs>>): Prisma__TileOwnershipClient<$Result.GetResult<Prisma.$TileOwnershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TileOwnerships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileOwnershipCountArgs} args - Arguments to filter TileOwnerships to count.
     * @example
     * // Count the number of TileOwnerships
     * const count = await prisma.tileOwnership.count({
     *   where: {
     *     // ... the filter for the TileOwnerships we want to count
     *   }
     * })
    **/
    count<T extends TileOwnershipCountArgs>(
      args?: Subset<T, TileOwnershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TileOwnershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TileOwnership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileOwnershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TileOwnershipAggregateArgs>(args: Subset<T, TileOwnershipAggregateArgs>): Prisma.PrismaPromise<GetTileOwnershipAggregateType<T>>

    /**
     * Group by TileOwnership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileOwnershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TileOwnershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TileOwnershipGroupByArgs['orderBy'] }
        : { orderBy?: TileOwnershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TileOwnershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTileOwnershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TileOwnership model
   */
  readonly fields: TileOwnershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TileOwnership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TileOwnershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TileOwnership model
   */
  interface TileOwnershipFieldRefs {
    readonly id: FieldRef<"TileOwnership", 'Int'>
    readonly userId: FieldRef<"TileOwnership", 'Int'>
    readonly tileId: FieldRef<"TileOwnership", 'String'>
    readonly createdAt: FieldRef<"TileOwnership", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TileOwnership findUnique
   */
  export type TileOwnershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipInclude<ExtArgs> | null
    /**
     * Filter, which TileOwnership to fetch.
     */
    where: TileOwnershipWhereUniqueInput
  }

  /**
   * TileOwnership findUniqueOrThrow
   */
  export type TileOwnershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipInclude<ExtArgs> | null
    /**
     * Filter, which TileOwnership to fetch.
     */
    where: TileOwnershipWhereUniqueInput
  }

  /**
   * TileOwnership findFirst
   */
  export type TileOwnershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipInclude<ExtArgs> | null
    /**
     * Filter, which TileOwnership to fetch.
     */
    where?: TileOwnershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileOwnerships to fetch.
     */
    orderBy?: TileOwnershipOrderByWithRelationInput | TileOwnershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TileOwnerships.
     */
    cursor?: TileOwnershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileOwnerships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileOwnerships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TileOwnerships.
     */
    distinct?: TileOwnershipScalarFieldEnum | TileOwnershipScalarFieldEnum[]
  }

  /**
   * TileOwnership findFirstOrThrow
   */
  export type TileOwnershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipInclude<ExtArgs> | null
    /**
     * Filter, which TileOwnership to fetch.
     */
    where?: TileOwnershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileOwnerships to fetch.
     */
    orderBy?: TileOwnershipOrderByWithRelationInput | TileOwnershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TileOwnerships.
     */
    cursor?: TileOwnershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileOwnerships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileOwnerships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TileOwnerships.
     */
    distinct?: TileOwnershipScalarFieldEnum | TileOwnershipScalarFieldEnum[]
  }

  /**
   * TileOwnership findMany
   */
  export type TileOwnershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipInclude<ExtArgs> | null
    /**
     * Filter, which TileOwnerships to fetch.
     */
    where?: TileOwnershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileOwnerships to fetch.
     */
    orderBy?: TileOwnershipOrderByWithRelationInput | TileOwnershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TileOwnerships.
     */
    cursor?: TileOwnershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileOwnerships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileOwnerships.
     */
    skip?: number
    distinct?: TileOwnershipScalarFieldEnum | TileOwnershipScalarFieldEnum[]
  }

  /**
   * TileOwnership create
   */
  export type TileOwnershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipInclude<ExtArgs> | null
    /**
     * The data needed to create a TileOwnership.
     */
    data: XOR<TileOwnershipCreateInput, TileOwnershipUncheckedCreateInput>
  }

  /**
   * TileOwnership createMany
   */
  export type TileOwnershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TileOwnerships.
     */
    data: TileOwnershipCreateManyInput | TileOwnershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TileOwnership createManyAndReturn
   */
  export type TileOwnershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * The data used to create many TileOwnerships.
     */
    data: TileOwnershipCreateManyInput | TileOwnershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TileOwnership update
   */
  export type TileOwnershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipInclude<ExtArgs> | null
    /**
     * The data needed to update a TileOwnership.
     */
    data: XOR<TileOwnershipUpdateInput, TileOwnershipUncheckedUpdateInput>
    /**
     * Choose, which TileOwnership to update.
     */
    where: TileOwnershipWhereUniqueInput
  }

  /**
   * TileOwnership updateMany
   */
  export type TileOwnershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TileOwnerships.
     */
    data: XOR<TileOwnershipUpdateManyMutationInput, TileOwnershipUncheckedUpdateManyInput>
    /**
     * Filter which TileOwnerships to update
     */
    where?: TileOwnershipWhereInput
    /**
     * Limit how many TileOwnerships to update.
     */
    limit?: number
  }

  /**
   * TileOwnership updateManyAndReturn
   */
  export type TileOwnershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * The data used to update TileOwnerships.
     */
    data: XOR<TileOwnershipUpdateManyMutationInput, TileOwnershipUncheckedUpdateManyInput>
    /**
     * Filter which TileOwnerships to update
     */
    where?: TileOwnershipWhereInput
    /**
     * Limit how many TileOwnerships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TileOwnership upsert
   */
  export type TileOwnershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipInclude<ExtArgs> | null
    /**
     * The filter to search for the TileOwnership to update in case it exists.
     */
    where: TileOwnershipWhereUniqueInput
    /**
     * In case the TileOwnership found by the `where` argument doesn't exist, create a new TileOwnership with this data.
     */
    create: XOR<TileOwnershipCreateInput, TileOwnershipUncheckedCreateInput>
    /**
     * In case the TileOwnership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TileOwnershipUpdateInput, TileOwnershipUncheckedUpdateInput>
  }

  /**
   * TileOwnership delete
   */
  export type TileOwnershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipInclude<ExtArgs> | null
    /**
     * Filter which TileOwnership to delete.
     */
    where: TileOwnershipWhereUniqueInput
  }

  /**
   * TileOwnership deleteMany
   */
  export type TileOwnershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TileOwnerships to delete
     */
    where?: TileOwnershipWhereInput
    /**
     * Limit how many TileOwnerships to delete.
     */
    limit?: number
  }

  /**
   * TileOwnership without action
   */
  export type TileOwnershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileOwnership
     */
    select?: TileOwnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileOwnership
     */
    omit?: TileOwnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileOwnershipInclude<ExtArgs> | null
  }


  /**
   * Model TileHistory
   */

  export type AggregateTileHistory = {
    _count: TileHistoryCountAggregateOutputType | null
    _avg: TileHistoryAvgAggregateOutputType | null
    _sum: TileHistorySumAggregateOutputType | null
    _min: TileHistoryMinAggregateOutputType | null
    _max: TileHistoryMaxAggregateOutputType | null
  }

  export type TileHistoryAvgAggregateOutputType = {
    id: number | null
    previousUser: number | null
    newUser: number | null
    activityId: number | null
  }

  export type TileHistorySumAggregateOutputType = {
    id: number | null
    previousUser: number | null
    newUser: number | null
    activityId: number | null
  }

  export type TileHistoryMinAggregateOutputType = {
    id: number | null
    tileId: string | null
    previousUser: number | null
    newUser: number | null
    activityId: number | null
    createdAt: Date | null
  }

  export type TileHistoryMaxAggregateOutputType = {
    id: number | null
    tileId: string | null
    previousUser: number | null
    newUser: number | null
    activityId: number | null
    createdAt: Date | null
  }

  export type TileHistoryCountAggregateOutputType = {
    id: number
    tileId: number
    previousUser: number
    newUser: number
    activityId: number
    createdAt: number
    _all: number
  }


  export type TileHistoryAvgAggregateInputType = {
    id?: true
    previousUser?: true
    newUser?: true
    activityId?: true
  }

  export type TileHistorySumAggregateInputType = {
    id?: true
    previousUser?: true
    newUser?: true
    activityId?: true
  }

  export type TileHistoryMinAggregateInputType = {
    id?: true
    tileId?: true
    previousUser?: true
    newUser?: true
    activityId?: true
    createdAt?: true
  }

  export type TileHistoryMaxAggregateInputType = {
    id?: true
    tileId?: true
    previousUser?: true
    newUser?: true
    activityId?: true
    createdAt?: true
  }

  export type TileHistoryCountAggregateInputType = {
    id?: true
    tileId?: true
    previousUser?: true
    newUser?: true
    activityId?: true
    createdAt?: true
    _all?: true
  }

  export type TileHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TileHistory to aggregate.
     */
    where?: TileHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileHistories to fetch.
     */
    orderBy?: TileHistoryOrderByWithRelationInput | TileHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TileHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TileHistories
    **/
    _count?: true | TileHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TileHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TileHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TileHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TileHistoryMaxAggregateInputType
  }

  export type GetTileHistoryAggregateType<T extends TileHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateTileHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTileHistory[P]>
      : GetScalarType<T[P], AggregateTileHistory[P]>
  }




  export type TileHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TileHistoryWhereInput
    orderBy?: TileHistoryOrderByWithAggregationInput | TileHistoryOrderByWithAggregationInput[]
    by: TileHistoryScalarFieldEnum[] | TileHistoryScalarFieldEnum
    having?: TileHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TileHistoryCountAggregateInputType | true
    _avg?: TileHistoryAvgAggregateInputType
    _sum?: TileHistorySumAggregateInputType
    _min?: TileHistoryMinAggregateInputType
    _max?: TileHistoryMaxAggregateInputType
  }

  export type TileHistoryGroupByOutputType = {
    id: number
    tileId: string
    previousUser: number | null
    newUser: number
    activityId: number | null
    createdAt: Date
    _count: TileHistoryCountAggregateOutputType | null
    _avg: TileHistoryAvgAggregateOutputType | null
    _sum: TileHistorySumAggregateOutputType | null
    _min: TileHistoryMinAggregateOutputType | null
    _max: TileHistoryMaxAggregateOutputType | null
  }

  type GetTileHistoryGroupByPayload<T extends TileHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TileHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TileHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TileHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], TileHistoryGroupByOutputType[P]>
        }
      >
    >


  export type TileHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tileId?: boolean
    previousUser?: boolean
    newUser?: boolean
    activityId?: boolean
    createdAt?: boolean
    userNew?: boolean | TileHistory$userNewArgs<ExtArgs>
    userPrev?: boolean | TileHistory$userPrevArgs<ExtArgs>
    activity?: boolean | TileHistory$activityArgs<ExtArgs>
  }, ExtArgs["result"]["tileHistory"]>

  export type TileHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tileId?: boolean
    previousUser?: boolean
    newUser?: boolean
    activityId?: boolean
    createdAt?: boolean
    userNew?: boolean | TileHistory$userNewArgs<ExtArgs>
    userPrev?: boolean | TileHistory$userPrevArgs<ExtArgs>
    activity?: boolean | TileHistory$activityArgs<ExtArgs>
  }, ExtArgs["result"]["tileHistory"]>

  export type TileHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tileId?: boolean
    previousUser?: boolean
    newUser?: boolean
    activityId?: boolean
    createdAt?: boolean
    userNew?: boolean | TileHistory$userNewArgs<ExtArgs>
    userPrev?: boolean | TileHistory$userPrevArgs<ExtArgs>
    activity?: boolean | TileHistory$activityArgs<ExtArgs>
  }, ExtArgs["result"]["tileHistory"]>

  export type TileHistorySelectScalar = {
    id?: boolean
    tileId?: boolean
    previousUser?: boolean
    newUser?: boolean
    activityId?: boolean
    createdAt?: boolean
  }

  export type TileHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tileId" | "previousUser" | "newUser" | "activityId" | "createdAt", ExtArgs["result"]["tileHistory"]>
  export type TileHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userNew?: boolean | TileHistory$userNewArgs<ExtArgs>
    userPrev?: boolean | TileHistory$userPrevArgs<ExtArgs>
    activity?: boolean | TileHistory$activityArgs<ExtArgs>
  }
  export type TileHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userNew?: boolean | TileHistory$userNewArgs<ExtArgs>
    userPrev?: boolean | TileHistory$userPrevArgs<ExtArgs>
    activity?: boolean | TileHistory$activityArgs<ExtArgs>
  }
  export type TileHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userNew?: boolean | TileHistory$userNewArgs<ExtArgs>
    userPrev?: boolean | TileHistory$userPrevArgs<ExtArgs>
    activity?: boolean | TileHistory$activityArgs<ExtArgs>
  }

  export type $TileHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TileHistory"
    objects: {
      userNew: Prisma.$UserPayload<ExtArgs> | null
      userPrev: Prisma.$UserPayload<ExtArgs> | null
      activity: Prisma.$ActivityPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tileId: string
      previousUser: number | null
      newUser: number
      activityId: number | null
      createdAt: Date
    }, ExtArgs["result"]["tileHistory"]>
    composites: {}
  }

  type TileHistoryGetPayload<S extends boolean | null | undefined | TileHistoryDefaultArgs> = $Result.GetResult<Prisma.$TileHistoryPayload, S>

  type TileHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TileHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TileHistoryCountAggregateInputType | true
    }

  export interface TileHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TileHistory'], meta: { name: 'TileHistory' } }
    /**
     * Find zero or one TileHistory that matches the filter.
     * @param {TileHistoryFindUniqueArgs} args - Arguments to find a TileHistory
     * @example
     * // Get one TileHistory
     * const tileHistory = await prisma.tileHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TileHistoryFindUniqueArgs>(args: SelectSubset<T, TileHistoryFindUniqueArgs<ExtArgs>>): Prisma__TileHistoryClient<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TileHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TileHistoryFindUniqueOrThrowArgs} args - Arguments to find a TileHistory
     * @example
     * // Get one TileHistory
     * const tileHistory = await prisma.tileHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TileHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, TileHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TileHistoryClient<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TileHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileHistoryFindFirstArgs} args - Arguments to find a TileHistory
     * @example
     * // Get one TileHistory
     * const tileHistory = await prisma.tileHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TileHistoryFindFirstArgs>(args?: SelectSubset<T, TileHistoryFindFirstArgs<ExtArgs>>): Prisma__TileHistoryClient<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TileHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileHistoryFindFirstOrThrowArgs} args - Arguments to find a TileHistory
     * @example
     * // Get one TileHistory
     * const tileHistory = await prisma.tileHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TileHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, TileHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__TileHistoryClient<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TileHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TileHistories
     * const tileHistories = await prisma.tileHistory.findMany()
     * 
     * // Get first 10 TileHistories
     * const tileHistories = await prisma.tileHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tileHistoryWithIdOnly = await prisma.tileHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TileHistoryFindManyArgs>(args?: SelectSubset<T, TileHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TileHistory.
     * @param {TileHistoryCreateArgs} args - Arguments to create a TileHistory.
     * @example
     * // Create one TileHistory
     * const TileHistory = await prisma.tileHistory.create({
     *   data: {
     *     // ... data to create a TileHistory
     *   }
     * })
     * 
     */
    create<T extends TileHistoryCreateArgs>(args: SelectSubset<T, TileHistoryCreateArgs<ExtArgs>>): Prisma__TileHistoryClient<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TileHistories.
     * @param {TileHistoryCreateManyArgs} args - Arguments to create many TileHistories.
     * @example
     * // Create many TileHistories
     * const tileHistory = await prisma.tileHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TileHistoryCreateManyArgs>(args?: SelectSubset<T, TileHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TileHistories and returns the data saved in the database.
     * @param {TileHistoryCreateManyAndReturnArgs} args - Arguments to create many TileHistories.
     * @example
     * // Create many TileHistories
     * const tileHistory = await prisma.tileHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TileHistories and only return the `id`
     * const tileHistoryWithIdOnly = await prisma.tileHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TileHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, TileHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TileHistory.
     * @param {TileHistoryDeleteArgs} args - Arguments to delete one TileHistory.
     * @example
     * // Delete one TileHistory
     * const TileHistory = await prisma.tileHistory.delete({
     *   where: {
     *     // ... filter to delete one TileHistory
     *   }
     * })
     * 
     */
    delete<T extends TileHistoryDeleteArgs>(args: SelectSubset<T, TileHistoryDeleteArgs<ExtArgs>>): Prisma__TileHistoryClient<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TileHistory.
     * @param {TileHistoryUpdateArgs} args - Arguments to update one TileHistory.
     * @example
     * // Update one TileHistory
     * const tileHistory = await prisma.tileHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TileHistoryUpdateArgs>(args: SelectSubset<T, TileHistoryUpdateArgs<ExtArgs>>): Prisma__TileHistoryClient<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TileHistories.
     * @param {TileHistoryDeleteManyArgs} args - Arguments to filter TileHistories to delete.
     * @example
     * // Delete a few TileHistories
     * const { count } = await prisma.tileHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TileHistoryDeleteManyArgs>(args?: SelectSubset<T, TileHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TileHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TileHistories
     * const tileHistory = await prisma.tileHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TileHistoryUpdateManyArgs>(args: SelectSubset<T, TileHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TileHistories and returns the data updated in the database.
     * @param {TileHistoryUpdateManyAndReturnArgs} args - Arguments to update many TileHistories.
     * @example
     * // Update many TileHistories
     * const tileHistory = await prisma.tileHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TileHistories and only return the `id`
     * const tileHistoryWithIdOnly = await prisma.tileHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TileHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, TileHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TileHistory.
     * @param {TileHistoryUpsertArgs} args - Arguments to update or create a TileHistory.
     * @example
     * // Update or create a TileHistory
     * const tileHistory = await prisma.tileHistory.upsert({
     *   create: {
     *     // ... data to create a TileHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TileHistory we want to update
     *   }
     * })
     */
    upsert<T extends TileHistoryUpsertArgs>(args: SelectSubset<T, TileHistoryUpsertArgs<ExtArgs>>): Prisma__TileHistoryClient<$Result.GetResult<Prisma.$TileHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TileHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileHistoryCountArgs} args - Arguments to filter TileHistories to count.
     * @example
     * // Count the number of TileHistories
     * const count = await prisma.tileHistory.count({
     *   where: {
     *     // ... the filter for the TileHistories we want to count
     *   }
     * })
    **/
    count<T extends TileHistoryCountArgs>(
      args?: Subset<T, TileHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TileHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TileHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TileHistoryAggregateArgs>(args: Subset<T, TileHistoryAggregateArgs>): Prisma.PrismaPromise<GetTileHistoryAggregateType<T>>

    /**
     * Group by TileHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TileHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TileHistoryGroupByArgs['orderBy'] }
        : { orderBy?: TileHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TileHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTileHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TileHistory model
   */
  readonly fields: TileHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TileHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TileHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userNew<T extends TileHistory$userNewArgs<ExtArgs> = {}>(args?: Subset<T, TileHistory$userNewArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    userPrev<T extends TileHistory$userPrevArgs<ExtArgs> = {}>(args?: Subset<T, TileHistory$userPrevArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    activity<T extends TileHistory$activityArgs<ExtArgs> = {}>(args?: Subset<T, TileHistory$activityArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TileHistory model
   */
  interface TileHistoryFieldRefs {
    readonly id: FieldRef<"TileHistory", 'Int'>
    readonly tileId: FieldRef<"TileHistory", 'String'>
    readonly previousUser: FieldRef<"TileHistory", 'Int'>
    readonly newUser: FieldRef<"TileHistory", 'Int'>
    readonly activityId: FieldRef<"TileHistory", 'Int'>
    readonly createdAt: FieldRef<"TileHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TileHistory findUnique
   */
  export type TileHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TileHistory to fetch.
     */
    where: TileHistoryWhereUniqueInput
  }

  /**
   * TileHistory findUniqueOrThrow
   */
  export type TileHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TileHistory to fetch.
     */
    where: TileHistoryWhereUniqueInput
  }

  /**
   * TileHistory findFirst
   */
  export type TileHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TileHistory to fetch.
     */
    where?: TileHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileHistories to fetch.
     */
    orderBy?: TileHistoryOrderByWithRelationInput | TileHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TileHistories.
     */
    cursor?: TileHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TileHistories.
     */
    distinct?: TileHistoryScalarFieldEnum | TileHistoryScalarFieldEnum[]
  }

  /**
   * TileHistory findFirstOrThrow
   */
  export type TileHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TileHistory to fetch.
     */
    where?: TileHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileHistories to fetch.
     */
    orderBy?: TileHistoryOrderByWithRelationInput | TileHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TileHistories.
     */
    cursor?: TileHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TileHistories.
     */
    distinct?: TileHistoryScalarFieldEnum | TileHistoryScalarFieldEnum[]
  }

  /**
   * TileHistory findMany
   */
  export type TileHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TileHistories to fetch.
     */
    where?: TileHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileHistories to fetch.
     */
    orderBy?: TileHistoryOrderByWithRelationInput | TileHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TileHistories.
     */
    cursor?: TileHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileHistories.
     */
    skip?: number
    distinct?: TileHistoryScalarFieldEnum | TileHistoryScalarFieldEnum[]
  }

  /**
   * TileHistory create
   */
  export type TileHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a TileHistory.
     */
    data: XOR<TileHistoryCreateInput, TileHistoryUncheckedCreateInput>
  }

  /**
   * TileHistory createMany
   */
  export type TileHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TileHistories.
     */
    data: TileHistoryCreateManyInput | TileHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TileHistory createManyAndReturn
   */
  export type TileHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many TileHistories.
     */
    data: TileHistoryCreateManyInput | TileHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TileHistory update
   */
  export type TileHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a TileHistory.
     */
    data: XOR<TileHistoryUpdateInput, TileHistoryUncheckedUpdateInput>
    /**
     * Choose, which TileHistory to update.
     */
    where: TileHistoryWhereUniqueInput
  }

  /**
   * TileHistory updateMany
   */
  export type TileHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TileHistories.
     */
    data: XOR<TileHistoryUpdateManyMutationInput, TileHistoryUncheckedUpdateManyInput>
    /**
     * Filter which TileHistories to update
     */
    where?: TileHistoryWhereInput
    /**
     * Limit how many TileHistories to update.
     */
    limit?: number
  }

  /**
   * TileHistory updateManyAndReturn
   */
  export type TileHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * The data used to update TileHistories.
     */
    data: XOR<TileHistoryUpdateManyMutationInput, TileHistoryUncheckedUpdateManyInput>
    /**
     * Filter which TileHistories to update
     */
    where?: TileHistoryWhereInput
    /**
     * Limit how many TileHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TileHistory upsert
   */
  export type TileHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the TileHistory to update in case it exists.
     */
    where: TileHistoryWhereUniqueInput
    /**
     * In case the TileHistory found by the `where` argument doesn't exist, create a new TileHistory with this data.
     */
    create: XOR<TileHistoryCreateInput, TileHistoryUncheckedCreateInput>
    /**
     * In case the TileHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TileHistoryUpdateInput, TileHistoryUncheckedUpdateInput>
  }

  /**
   * TileHistory delete
   */
  export type TileHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
    /**
     * Filter which TileHistory to delete.
     */
    where: TileHistoryWhereUniqueInput
  }

  /**
   * TileHistory deleteMany
   */
  export type TileHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TileHistories to delete
     */
    where?: TileHistoryWhereInput
    /**
     * Limit how many TileHistories to delete.
     */
    limit?: number
  }

  /**
   * TileHistory.userNew
   */
  export type TileHistory$userNewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TileHistory.userPrev
   */
  export type TileHistory$userPrevArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TileHistory.activity
   */
  export type TileHistory$activityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
  }

  /**
   * TileHistory without action
   */
  export type TileHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileHistory
     */
    select?: TileHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TileHistory
     */
    omit?: TileHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileHistoryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    stravaAthleteId: 'stravaAthleteId',
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    profile: 'profile',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    stravaId: 'stravaId',
    userId: 'userId',
    source: 'source',
    name: 'name',
    distanceM: 'distanceM',
    movingTimeS: 'movingTimeS',
    startLat: 'startLat',
    startLng: 'startLng',
    endLat: 'endLat',
    endLng: 'endLng',
    polyline: 'polyline',
    captured: 'captured',
    createdAt: 'createdAt'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const TileOwnershipScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tileId: 'tileId',
    createdAt: 'createdAt'
  };

  export type TileOwnershipScalarFieldEnum = (typeof TileOwnershipScalarFieldEnum)[keyof typeof TileOwnershipScalarFieldEnum]


  export const TileHistoryScalarFieldEnum: {
    id: 'id',
    tileId: 'tileId',
    previousUser: 'previousUser',
    newUser: 'newUser',
    activityId: 'activityId',
    createdAt: 'createdAt'
  };

  export type TileHistoryScalarFieldEnum = (typeof TileHistoryScalarFieldEnum)[keyof typeof TileHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    stravaAthleteId?: BigIntFilter<"User"> | bigint | number
    username?: StringNullableFilter<"User"> | string | null
    firstname?: StringNullableFilter<"User"> | string | null
    lastname?: StringNullableFilter<"User"> | string | null
    profile?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    activities?: ActivityListRelationFilter
    tiles?: TileOwnershipListRelationFilter
    historyCaptured?: TileHistoryListRelationFilter
    historyLost?: TileHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    stravaAthleteId?: SortOrder
    username?: SortOrderInput | SortOrder
    firstname?: SortOrderInput | SortOrder
    lastname?: SortOrderInput | SortOrder
    profile?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    activities?: ActivityOrderByRelationAggregateInput
    tiles?: TileOwnershipOrderByRelationAggregateInput
    historyCaptured?: TileHistoryOrderByRelationAggregateInput
    historyLost?: TileHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    stravaAthleteId?: bigint | number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringNullableFilter<"User"> | string | null
    firstname?: StringNullableFilter<"User"> | string | null
    lastname?: StringNullableFilter<"User"> | string | null
    profile?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    activities?: ActivityListRelationFilter
    tiles?: TileOwnershipListRelationFilter
    historyCaptured?: TileHistoryListRelationFilter
    historyLost?: TileHistoryListRelationFilter
  }, "id" | "stravaAthleteId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    stravaAthleteId?: SortOrder
    username?: SortOrderInput | SortOrder
    firstname?: SortOrderInput | SortOrder
    lastname?: SortOrderInput | SortOrder
    profile?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    stravaAthleteId?: BigIntWithAggregatesFilter<"User"> | bigint | number
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstname?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastname?: StringNullableWithAggregatesFilter<"User"> | string | null
    profile?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: IntFilter<"Activity"> | number
    stravaId?: BigIntNullableFilter<"Activity"> | bigint | number | null
    userId?: IntFilter<"Activity"> | number
    source?: StringFilter<"Activity"> | string
    name?: StringNullableFilter<"Activity"> | string | null
    distanceM?: FloatNullableFilter<"Activity"> | number | null
    movingTimeS?: IntNullableFilter<"Activity"> | number | null
    startLat?: FloatNullableFilter<"Activity"> | number | null
    startLng?: FloatNullableFilter<"Activity"> | number | null
    endLat?: FloatNullableFilter<"Activity"> | number | null
    endLng?: FloatNullableFilter<"Activity"> | number | null
    polyline?: StringNullableFilter<"Activity"> | string | null
    captured?: BoolFilter<"Activity"> | boolean
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tileHistory?: TileHistoryListRelationFilter
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    stravaId?: SortOrderInput | SortOrder
    userId?: SortOrder
    source?: SortOrder
    name?: SortOrderInput | SortOrder
    distanceM?: SortOrderInput | SortOrder
    movingTimeS?: SortOrderInput | SortOrder
    startLat?: SortOrderInput | SortOrder
    startLng?: SortOrderInput | SortOrder
    endLat?: SortOrderInput | SortOrder
    endLng?: SortOrderInput | SortOrder
    polyline?: SortOrderInput | SortOrder
    captured?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    tileHistory?: TileHistoryOrderByRelationAggregateInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    stravaId?: bigint | number
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    userId?: IntFilter<"Activity"> | number
    source?: StringFilter<"Activity"> | string
    name?: StringNullableFilter<"Activity"> | string | null
    distanceM?: FloatNullableFilter<"Activity"> | number | null
    movingTimeS?: IntNullableFilter<"Activity"> | number | null
    startLat?: FloatNullableFilter<"Activity"> | number | null
    startLng?: FloatNullableFilter<"Activity"> | number | null
    endLat?: FloatNullableFilter<"Activity"> | number | null
    endLng?: FloatNullableFilter<"Activity"> | number | null
    polyline?: StringNullableFilter<"Activity"> | string | null
    captured?: BoolFilter<"Activity"> | boolean
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tileHistory?: TileHistoryListRelationFilter
  }, "id" | "stravaId">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    stravaId?: SortOrderInput | SortOrder
    userId?: SortOrder
    source?: SortOrder
    name?: SortOrderInput | SortOrder
    distanceM?: SortOrderInput | SortOrder
    movingTimeS?: SortOrderInput | SortOrder
    startLat?: SortOrderInput | SortOrder
    startLng?: SortOrderInput | SortOrder
    endLat?: SortOrderInput | SortOrder
    endLng?: SortOrderInput | SortOrder
    polyline?: SortOrderInput | SortOrder
    captured?: SortOrder
    createdAt?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _avg?: ActivityAvgOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
    _sum?: ActivitySumOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Activity"> | number
    stravaId?: BigIntNullableWithAggregatesFilter<"Activity"> | bigint | number | null
    userId?: IntWithAggregatesFilter<"Activity"> | number
    source?: StringWithAggregatesFilter<"Activity"> | string
    name?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    distanceM?: FloatNullableWithAggregatesFilter<"Activity"> | number | null
    movingTimeS?: IntNullableWithAggregatesFilter<"Activity"> | number | null
    startLat?: FloatNullableWithAggregatesFilter<"Activity"> | number | null
    startLng?: FloatNullableWithAggregatesFilter<"Activity"> | number | null
    endLat?: FloatNullableWithAggregatesFilter<"Activity"> | number | null
    endLng?: FloatNullableWithAggregatesFilter<"Activity"> | number | null
    polyline?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    captured?: BoolWithAggregatesFilter<"Activity"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
  }

  export type TileOwnershipWhereInput = {
    AND?: TileOwnershipWhereInput | TileOwnershipWhereInput[]
    OR?: TileOwnershipWhereInput[]
    NOT?: TileOwnershipWhereInput | TileOwnershipWhereInput[]
    id?: IntFilter<"TileOwnership"> | number
    userId?: IntFilter<"TileOwnership"> | number
    tileId?: StringFilter<"TileOwnership"> | string
    createdAt?: DateTimeFilter<"TileOwnership"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TileOwnershipOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tileId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TileOwnershipWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    tileId?: string
    AND?: TileOwnershipWhereInput | TileOwnershipWhereInput[]
    OR?: TileOwnershipWhereInput[]
    NOT?: TileOwnershipWhereInput | TileOwnershipWhereInput[]
    userId?: IntFilter<"TileOwnership"> | number
    createdAt?: DateTimeFilter<"TileOwnership"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "tileId">

  export type TileOwnershipOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tileId?: SortOrder
    createdAt?: SortOrder
    _count?: TileOwnershipCountOrderByAggregateInput
    _avg?: TileOwnershipAvgOrderByAggregateInput
    _max?: TileOwnershipMaxOrderByAggregateInput
    _min?: TileOwnershipMinOrderByAggregateInput
    _sum?: TileOwnershipSumOrderByAggregateInput
  }

  export type TileOwnershipScalarWhereWithAggregatesInput = {
    AND?: TileOwnershipScalarWhereWithAggregatesInput | TileOwnershipScalarWhereWithAggregatesInput[]
    OR?: TileOwnershipScalarWhereWithAggregatesInput[]
    NOT?: TileOwnershipScalarWhereWithAggregatesInput | TileOwnershipScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TileOwnership"> | number
    userId?: IntWithAggregatesFilter<"TileOwnership"> | number
    tileId?: StringWithAggregatesFilter<"TileOwnership"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TileOwnership"> | Date | string
  }

  export type TileHistoryWhereInput = {
    AND?: TileHistoryWhereInput | TileHistoryWhereInput[]
    OR?: TileHistoryWhereInput[]
    NOT?: TileHistoryWhereInput | TileHistoryWhereInput[]
    id?: IntFilter<"TileHistory"> | number
    tileId?: StringFilter<"TileHistory"> | string
    previousUser?: IntNullableFilter<"TileHistory"> | number | null
    newUser?: IntFilter<"TileHistory"> | number
    activityId?: IntNullableFilter<"TileHistory"> | number | null
    createdAt?: DateTimeFilter<"TileHistory"> | Date | string
    userNew?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    userPrev?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    activity?: XOR<ActivityNullableScalarRelationFilter, ActivityWhereInput> | null
  }

  export type TileHistoryOrderByWithRelationInput = {
    id?: SortOrder
    tileId?: SortOrder
    previousUser?: SortOrderInput | SortOrder
    newUser?: SortOrder
    activityId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userNew?: UserOrderByWithRelationInput
    userPrev?: UserOrderByWithRelationInput
    activity?: ActivityOrderByWithRelationInput
  }

  export type TileHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TileHistoryWhereInput | TileHistoryWhereInput[]
    OR?: TileHistoryWhereInput[]
    NOT?: TileHistoryWhereInput | TileHistoryWhereInput[]
    tileId?: StringFilter<"TileHistory"> | string
    previousUser?: IntNullableFilter<"TileHistory"> | number | null
    newUser?: IntFilter<"TileHistory"> | number
    activityId?: IntNullableFilter<"TileHistory"> | number | null
    createdAt?: DateTimeFilter<"TileHistory"> | Date | string
    userNew?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    userPrev?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    activity?: XOR<ActivityNullableScalarRelationFilter, ActivityWhereInput> | null
  }, "id">

  export type TileHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    tileId?: SortOrder
    previousUser?: SortOrderInput | SortOrder
    newUser?: SortOrder
    activityId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TileHistoryCountOrderByAggregateInput
    _avg?: TileHistoryAvgOrderByAggregateInput
    _max?: TileHistoryMaxOrderByAggregateInput
    _min?: TileHistoryMinOrderByAggregateInput
    _sum?: TileHistorySumOrderByAggregateInput
  }

  export type TileHistoryScalarWhereWithAggregatesInput = {
    AND?: TileHistoryScalarWhereWithAggregatesInput | TileHistoryScalarWhereWithAggregatesInput[]
    OR?: TileHistoryScalarWhereWithAggregatesInput[]
    NOT?: TileHistoryScalarWhereWithAggregatesInput | TileHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TileHistory"> | number
    tileId?: StringWithAggregatesFilter<"TileHistory"> | string
    previousUser?: IntNullableWithAggregatesFilter<"TileHistory"> | number | null
    newUser?: IntWithAggregatesFilter<"TileHistory"> | number
    activityId?: IntNullableWithAggregatesFilter<"TileHistory"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"TileHistory"> | Date | string
  }

  export type UserCreateInput = {
    stravaAthleteId: bigint | number
    username?: string | null
    firstname?: string | null
    lastname?: string | null
    profile?: string | null
    createdAt?: Date | string
    activities?: ActivityCreateNestedManyWithoutUserInput
    tiles?: TileOwnershipCreateNestedManyWithoutUserInput
    historyCaptured?: TileHistoryCreateNestedManyWithoutUserNewInput
    historyLost?: TileHistoryCreateNestedManyWithoutUserPrevInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    stravaAthleteId: bigint | number
    username?: string | null
    firstname?: string | null
    lastname?: string | null
    profile?: string | null
    createdAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    tiles?: TileOwnershipUncheckedCreateNestedManyWithoutUserInput
    historyCaptured?: TileHistoryUncheckedCreateNestedManyWithoutUserNewInput
    historyLost?: TileHistoryUncheckedCreateNestedManyWithoutUserPrevInput
  }

  export type UserUpdateInput = {
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    tiles?: TileOwnershipUpdateManyWithoutUserNestedInput
    historyCaptured?: TileHistoryUpdateManyWithoutUserNewNestedInput
    historyLost?: TileHistoryUpdateManyWithoutUserPrevNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    tiles?: TileOwnershipUncheckedUpdateManyWithoutUserNestedInput
    historyCaptured?: TileHistoryUncheckedUpdateManyWithoutUserNewNestedInput
    historyLost?: TileHistoryUncheckedUpdateManyWithoutUserPrevNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    stravaAthleteId: bigint | number
    username?: string | null
    firstname?: string | null
    lastname?: string | null
    profile?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateInput = {
    stravaId?: bigint | number | null
    source?: string
    name?: string | null
    distanceM?: number | null
    movingTimeS?: number | null
    startLat?: number | null
    startLng?: number | null
    endLat?: number | null
    endLng?: number | null
    polyline?: string | null
    captured?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutActivitiesInput
    tileHistory?: TileHistoryCreateNestedManyWithoutActivityInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: number
    stravaId?: bigint | number | null
    userId: number
    source?: string
    name?: string | null
    distanceM?: number | null
    movingTimeS?: number | null
    startLat?: number | null
    startLng?: number | null
    endLat?: number | null
    endLng?: number | null
    polyline?: string | null
    captured?: boolean
    createdAt?: Date | string
    tileHistory?: TileHistoryUncheckedCreateNestedManyWithoutActivityInput
  }

  export type ActivityUpdateInput = {
    stravaId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    source?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    distanceM?: NullableFloatFieldUpdateOperationsInput | number | null
    movingTimeS?: NullableIntFieldUpdateOperationsInput | number | null
    startLat?: NullableFloatFieldUpdateOperationsInput | number | null
    startLng?: NullableFloatFieldUpdateOperationsInput | number | null
    endLat?: NullableFloatFieldUpdateOperationsInput | number | null
    endLng?: NullableFloatFieldUpdateOperationsInput | number | null
    polyline?: NullableStringFieldUpdateOperationsInput | string | null
    captured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInput
    tileHistory?: TileHistoryUpdateManyWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    stravaId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    userId?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    distanceM?: NullableFloatFieldUpdateOperationsInput | number | null
    movingTimeS?: NullableIntFieldUpdateOperationsInput | number | null
    startLat?: NullableFloatFieldUpdateOperationsInput | number | null
    startLng?: NullableFloatFieldUpdateOperationsInput | number | null
    endLat?: NullableFloatFieldUpdateOperationsInput | number | null
    endLng?: NullableFloatFieldUpdateOperationsInput | number | null
    polyline?: NullableStringFieldUpdateOperationsInput | string | null
    captured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tileHistory?: TileHistoryUncheckedUpdateManyWithoutActivityNestedInput
  }

  export type ActivityCreateManyInput = {
    id?: number
    stravaId?: bigint | number | null
    userId: number
    source?: string
    name?: string | null
    distanceM?: number | null
    movingTimeS?: number | null
    startLat?: number | null
    startLng?: number | null
    endLat?: number | null
    endLng?: number | null
    polyline?: string | null
    captured?: boolean
    createdAt?: Date | string
  }

  export type ActivityUpdateManyMutationInput = {
    stravaId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    source?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    distanceM?: NullableFloatFieldUpdateOperationsInput | number | null
    movingTimeS?: NullableIntFieldUpdateOperationsInput | number | null
    startLat?: NullableFloatFieldUpdateOperationsInput | number | null
    startLng?: NullableFloatFieldUpdateOperationsInput | number | null
    endLat?: NullableFloatFieldUpdateOperationsInput | number | null
    endLng?: NullableFloatFieldUpdateOperationsInput | number | null
    polyline?: NullableStringFieldUpdateOperationsInput | string | null
    captured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    stravaId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    userId?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    distanceM?: NullableFloatFieldUpdateOperationsInput | number | null
    movingTimeS?: NullableIntFieldUpdateOperationsInput | number | null
    startLat?: NullableFloatFieldUpdateOperationsInput | number | null
    startLng?: NullableFloatFieldUpdateOperationsInput | number | null
    endLat?: NullableFloatFieldUpdateOperationsInput | number | null
    endLng?: NullableFloatFieldUpdateOperationsInput | number | null
    polyline?: NullableStringFieldUpdateOperationsInput | string | null
    captured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileOwnershipCreateInput = {
    tileId: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTilesInput
  }

  export type TileOwnershipUncheckedCreateInput = {
    id?: number
    userId: number
    tileId: string
    createdAt?: Date | string
  }

  export type TileOwnershipUpdateInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTilesNestedInput
  }

  export type TileOwnershipUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileOwnershipCreateManyInput = {
    id?: number
    userId: number
    tileId: string
    createdAt?: Date | string
  }

  export type TileOwnershipUpdateManyMutationInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileOwnershipUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileHistoryCreateInput = {
    tileId: string
    createdAt?: Date | string
    userNew?: UserCreateNestedOneWithoutHistoryCapturedInput
    userPrev?: UserCreateNestedOneWithoutHistoryLostInput
    activity?: ActivityCreateNestedOneWithoutTileHistoryInput
  }

  export type TileHistoryUncheckedCreateInput = {
    id?: number
    tileId: string
    previousUser?: number | null
    newUser: number
    activityId?: number | null
    createdAt?: Date | string
  }

  export type TileHistoryUpdateInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNew?: UserUpdateOneWithoutHistoryCapturedNestedInput
    userPrev?: UserUpdateOneWithoutHistoryLostNestedInput
    activity?: ActivityUpdateOneWithoutTileHistoryNestedInput
  }

  export type TileHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    previousUser?: NullableIntFieldUpdateOperationsInput | number | null
    newUser?: IntFieldUpdateOperationsInput | number
    activityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileHistoryCreateManyInput = {
    id?: number
    tileId: string
    previousUser?: number | null
    newUser: number
    activityId?: number | null
    createdAt?: Date | string
  }

  export type TileHistoryUpdateManyMutationInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    previousUser?: NullableIntFieldUpdateOperationsInput | number | null
    newUser?: IntFieldUpdateOperationsInput | number
    activityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type TileOwnershipListRelationFilter = {
    every?: TileOwnershipWhereInput
    some?: TileOwnershipWhereInput
    none?: TileOwnershipWhereInput
  }

  export type TileHistoryListRelationFilter = {
    every?: TileHistoryWhereInput
    some?: TileHistoryWhereInput
    none?: TileHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TileOwnershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TileHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    stravaAthleteId?: SortOrder
    username?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    profile?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    stravaAthleteId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    stravaAthleteId?: SortOrder
    username?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    profile?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    stravaAthleteId?: SortOrder
    username?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    profile?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    stravaAthleteId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    stravaId?: SortOrder
    userId?: SortOrder
    source?: SortOrder
    name?: SortOrder
    distanceM?: SortOrder
    movingTimeS?: SortOrder
    startLat?: SortOrder
    startLng?: SortOrder
    endLat?: SortOrder
    endLng?: SortOrder
    polyline?: SortOrder
    captured?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityAvgOrderByAggregateInput = {
    id?: SortOrder
    stravaId?: SortOrder
    userId?: SortOrder
    distanceM?: SortOrder
    movingTimeS?: SortOrder
    startLat?: SortOrder
    startLng?: SortOrder
    endLat?: SortOrder
    endLng?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    stravaId?: SortOrder
    userId?: SortOrder
    source?: SortOrder
    name?: SortOrder
    distanceM?: SortOrder
    movingTimeS?: SortOrder
    startLat?: SortOrder
    startLng?: SortOrder
    endLat?: SortOrder
    endLng?: SortOrder
    polyline?: SortOrder
    captured?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    stravaId?: SortOrder
    userId?: SortOrder
    source?: SortOrder
    name?: SortOrder
    distanceM?: SortOrder
    movingTimeS?: SortOrder
    startLat?: SortOrder
    startLng?: SortOrder
    endLat?: SortOrder
    endLng?: SortOrder
    polyline?: SortOrder
    captured?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivitySumOrderByAggregateInput = {
    id?: SortOrder
    stravaId?: SortOrder
    userId?: SortOrder
    distanceM?: SortOrder
    movingTimeS?: SortOrder
    startLat?: SortOrder
    startLng?: SortOrder
    endLat?: SortOrder
    endLng?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TileOwnershipCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tileId?: SortOrder
    createdAt?: SortOrder
  }

  export type TileOwnershipAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TileOwnershipMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tileId?: SortOrder
    createdAt?: SortOrder
  }

  export type TileOwnershipMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tileId?: SortOrder
    createdAt?: SortOrder
  }

  export type TileOwnershipSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ActivityNullableScalarRelationFilter = {
    is?: ActivityWhereInput | null
    isNot?: ActivityWhereInput | null
  }

  export type TileHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    tileId?: SortOrder
    previousUser?: SortOrder
    newUser?: SortOrder
    activityId?: SortOrder
    createdAt?: SortOrder
  }

  export type TileHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    previousUser?: SortOrder
    newUser?: SortOrder
    activityId?: SortOrder
  }

  export type TileHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    tileId?: SortOrder
    previousUser?: SortOrder
    newUser?: SortOrder
    activityId?: SortOrder
    createdAt?: SortOrder
  }

  export type TileHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    tileId?: SortOrder
    previousUser?: SortOrder
    newUser?: SortOrder
    activityId?: SortOrder
    createdAt?: SortOrder
  }

  export type TileHistorySumOrderByAggregateInput = {
    id?: SortOrder
    previousUser?: SortOrder
    newUser?: SortOrder
    activityId?: SortOrder
  }

  export type ActivityCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type TileOwnershipCreateNestedManyWithoutUserInput = {
    create?: XOR<TileOwnershipCreateWithoutUserInput, TileOwnershipUncheckedCreateWithoutUserInput> | TileOwnershipCreateWithoutUserInput[] | TileOwnershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TileOwnershipCreateOrConnectWithoutUserInput | TileOwnershipCreateOrConnectWithoutUserInput[]
    createMany?: TileOwnershipCreateManyUserInputEnvelope
    connect?: TileOwnershipWhereUniqueInput | TileOwnershipWhereUniqueInput[]
  }

  export type TileHistoryCreateNestedManyWithoutUserNewInput = {
    create?: XOR<TileHistoryCreateWithoutUserNewInput, TileHistoryUncheckedCreateWithoutUserNewInput> | TileHistoryCreateWithoutUserNewInput[] | TileHistoryUncheckedCreateWithoutUserNewInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutUserNewInput | TileHistoryCreateOrConnectWithoutUserNewInput[]
    createMany?: TileHistoryCreateManyUserNewInputEnvelope
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
  }

  export type TileHistoryCreateNestedManyWithoutUserPrevInput = {
    create?: XOR<TileHistoryCreateWithoutUserPrevInput, TileHistoryUncheckedCreateWithoutUserPrevInput> | TileHistoryCreateWithoutUserPrevInput[] | TileHistoryUncheckedCreateWithoutUserPrevInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutUserPrevInput | TileHistoryCreateOrConnectWithoutUserPrevInput[]
    createMany?: TileHistoryCreateManyUserPrevInputEnvelope
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type TileOwnershipUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TileOwnershipCreateWithoutUserInput, TileOwnershipUncheckedCreateWithoutUserInput> | TileOwnershipCreateWithoutUserInput[] | TileOwnershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TileOwnershipCreateOrConnectWithoutUserInput | TileOwnershipCreateOrConnectWithoutUserInput[]
    createMany?: TileOwnershipCreateManyUserInputEnvelope
    connect?: TileOwnershipWhereUniqueInput | TileOwnershipWhereUniqueInput[]
  }

  export type TileHistoryUncheckedCreateNestedManyWithoutUserNewInput = {
    create?: XOR<TileHistoryCreateWithoutUserNewInput, TileHistoryUncheckedCreateWithoutUserNewInput> | TileHistoryCreateWithoutUserNewInput[] | TileHistoryUncheckedCreateWithoutUserNewInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutUserNewInput | TileHistoryCreateOrConnectWithoutUserNewInput[]
    createMany?: TileHistoryCreateManyUserNewInputEnvelope
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
  }

  export type TileHistoryUncheckedCreateNestedManyWithoutUserPrevInput = {
    create?: XOR<TileHistoryCreateWithoutUserPrevInput, TileHistoryUncheckedCreateWithoutUserPrevInput> | TileHistoryCreateWithoutUserPrevInput[] | TileHistoryUncheckedCreateWithoutUserPrevInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutUserPrevInput | TileHistoryCreateOrConnectWithoutUserPrevInput[]
    createMany?: TileHistoryCreateManyUserPrevInputEnvelope
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ActivityUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type TileOwnershipUpdateManyWithoutUserNestedInput = {
    create?: XOR<TileOwnershipCreateWithoutUserInput, TileOwnershipUncheckedCreateWithoutUserInput> | TileOwnershipCreateWithoutUserInput[] | TileOwnershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TileOwnershipCreateOrConnectWithoutUserInput | TileOwnershipCreateOrConnectWithoutUserInput[]
    upsert?: TileOwnershipUpsertWithWhereUniqueWithoutUserInput | TileOwnershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TileOwnershipCreateManyUserInputEnvelope
    set?: TileOwnershipWhereUniqueInput | TileOwnershipWhereUniqueInput[]
    disconnect?: TileOwnershipWhereUniqueInput | TileOwnershipWhereUniqueInput[]
    delete?: TileOwnershipWhereUniqueInput | TileOwnershipWhereUniqueInput[]
    connect?: TileOwnershipWhereUniqueInput | TileOwnershipWhereUniqueInput[]
    update?: TileOwnershipUpdateWithWhereUniqueWithoutUserInput | TileOwnershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TileOwnershipUpdateManyWithWhereWithoutUserInput | TileOwnershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TileOwnershipScalarWhereInput | TileOwnershipScalarWhereInput[]
  }

  export type TileHistoryUpdateManyWithoutUserNewNestedInput = {
    create?: XOR<TileHistoryCreateWithoutUserNewInput, TileHistoryUncheckedCreateWithoutUserNewInput> | TileHistoryCreateWithoutUserNewInput[] | TileHistoryUncheckedCreateWithoutUserNewInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutUserNewInput | TileHistoryCreateOrConnectWithoutUserNewInput[]
    upsert?: TileHistoryUpsertWithWhereUniqueWithoutUserNewInput | TileHistoryUpsertWithWhereUniqueWithoutUserNewInput[]
    createMany?: TileHistoryCreateManyUserNewInputEnvelope
    set?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    disconnect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    delete?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    update?: TileHistoryUpdateWithWhereUniqueWithoutUserNewInput | TileHistoryUpdateWithWhereUniqueWithoutUserNewInput[]
    updateMany?: TileHistoryUpdateManyWithWhereWithoutUserNewInput | TileHistoryUpdateManyWithWhereWithoutUserNewInput[]
    deleteMany?: TileHistoryScalarWhereInput | TileHistoryScalarWhereInput[]
  }

  export type TileHistoryUpdateManyWithoutUserPrevNestedInput = {
    create?: XOR<TileHistoryCreateWithoutUserPrevInput, TileHistoryUncheckedCreateWithoutUserPrevInput> | TileHistoryCreateWithoutUserPrevInput[] | TileHistoryUncheckedCreateWithoutUserPrevInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutUserPrevInput | TileHistoryCreateOrConnectWithoutUserPrevInput[]
    upsert?: TileHistoryUpsertWithWhereUniqueWithoutUserPrevInput | TileHistoryUpsertWithWhereUniqueWithoutUserPrevInput[]
    createMany?: TileHistoryCreateManyUserPrevInputEnvelope
    set?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    disconnect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    delete?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    update?: TileHistoryUpdateWithWhereUniqueWithoutUserPrevInput | TileHistoryUpdateWithWhereUniqueWithoutUserPrevInput[]
    updateMany?: TileHistoryUpdateManyWithWhereWithoutUserPrevInput | TileHistoryUpdateManyWithWhereWithoutUserPrevInput[]
    deleteMany?: TileHistoryScalarWhereInput | TileHistoryScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type TileOwnershipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TileOwnershipCreateWithoutUserInput, TileOwnershipUncheckedCreateWithoutUserInput> | TileOwnershipCreateWithoutUserInput[] | TileOwnershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TileOwnershipCreateOrConnectWithoutUserInput | TileOwnershipCreateOrConnectWithoutUserInput[]
    upsert?: TileOwnershipUpsertWithWhereUniqueWithoutUserInput | TileOwnershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TileOwnershipCreateManyUserInputEnvelope
    set?: TileOwnershipWhereUniqueInput | TileOwnershipWhereUniqueInput[]
    disconnect?: TileOwnershipWhereUniqueInput | TileOwnershipWhereUniqueInput[]
    delete?: TileOwnershipWhereUniqueInput | TileOwnershipWhereUniqueInput[]
    connect?: TileOwnershipWhereUniqueInput | TileOwnershipWhereUniqueInput[]
    update?: TileOwnershipUpdateWithWhereUniqueWithoutUserInput | TileOwnershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TileOwnershipUpdateManyWithWhereWithoutUserInput | TileOwnershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TileOwnershipScalarWhereInput | TileOwnershipScalarWhereInput[]
  }

  export type TileHistoryUncheckedUpdateManyWithoutUserNewNestedInput = {
    create?: XOR<TileHistoryCreateWithoutUserNewInput, TileHistoryUncheckedCreateWithoutUserNewInput> | TileHistoryCreateWithoutUserNewInput[] | TileHistoryUncheckedCreateWithoutUserNewInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutUserNewInput | TileHistoryCreateOrConnectWithoutUserNewInput[]
    upsert?: TileHistoryUpsertWithWhereUniqueWithoutUserNewInput | TileHistoryUpsertWithWhereUniqueWithoutUserNewInput[]
    createMany?: TileHistoryCreateManyUserNewInputEnvelope
    set?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    disconnect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    delete?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    update?: TileHistoryUpdateWithWhereUniqueWithoutUserNewInput | TileHistoryUpdateWithWhereUniqueWithoutUserNewInput[]
    updateMany?: TileHistoryUpdateManyWithWhereWithoutUserNewInput | TileHistoryUpdateManyWithWhereWithoutUserNewInput[]
    deleteMany?: TileHistoryScalarWhereInput | TileHistoryScalarWhereInput[]
  }

  export type TileHistoryUncheckedUpdateManyWithoutUserPrevNestedInput = {
    create?: XOR<TileHistoryCreateWithoutUserPrevInput, TileHistoryUncheckedCreateWithoutUserPrevInput> | TileHistoryCreateWithoutUserPrevInput[] | TileHistoryUncheckedCreateWithoutUserPrevInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutUserPrevInput | TileHistoryCreateOrConnectWithoutUserPrevInput[]
    upsert?: TileHistoryUpsertWithWhereUniqueWithoutUserPrevInput | TileHistoryUpsertWithWhereUniqueWithoutUserPrevInput[]
    createMany?: TileHistoryCreateManyUserPrevInputEnvelope
    set?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    disconnect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    delete?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    update?: TileHistoryUpdateWithWhereUniqueWithoutUserPrevInput | TileHistoryUpdateWithWhereUniqueWithoutUserPrevInput[]
    updateMany?: TileHistoryUpdateManyWithWhereWithoutUserPrevInput | TileHistoryUpdateManyWithWhereWithoutUserPrevInput[]
    deleteMany?: TileHistoryScalarWhereInput | TileHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    connect?: UserWhereUniqueInput
  }

  export type TileHistoryCreateNestedManyWithoutActivityInput = {
    create?: XOR<TileHistoryCreateWithoutActivityInput, TileHistoryUncheckedCreateWithoutActivityInput> | TileHistoryCreateWithoutActivityInput[] | TileHistoryUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutActivityInput | TileHistoryCreateOrConnectWithoutActivityInput[]
    createMany?: TileHistoryCreateManyActivityInputEnvelope
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
  }

  export type TileHistoryUncheckedCreateNestedManyWithoutActivityInput = {
    create?: XOR<TileHistoryCreateWithoutActivityInput, TileHistoryUncheckedCreateWithoutActivityInput> | TileHistoryCreateWithoutActivityInput[] | TileHistoryUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutActivityInput | TileHistoryCreateOrConnectWithoutActivityInput[]
    createMany?: TileHistoryCreateManyActivityInputEnvelope
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    upsert?: UserUpsertWithoutActivitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivitiesInput, UserUpdateWithoutActivitiesInput>, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type TileHistoryUpdateManyWithoutActivityNestedInput = {
    create?: XOR<TileHistoryCreateWithoutActivityInput, TileHistoryUncheckedCreateWithoutActivityInput> | TileHistoryCreateWithoutActivityInput[] | TileHistoryUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutActivityInput | TileHistoryCreateOrConnectWithoutActivityInput[]
    upsert?: TileHistoryUpsertWithWhereUniqueWithoutActivityInput | TileHistoryUpsertWithWhereUniqueWithoutActivityInput[]
    createMany?: TileHistoryCreateManyActivityInputEnvelope
    set?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    disconnect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    delete?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    update?: TileHistoryUpdateWithWhereUniqueWithoutActivityInput | TileHistoryUpdateWithWhereUniqueWithoutActivityInput[]
    updateMany?: TileHistoryUpdateManyWithWhereWithoutActivityInput | TileHistoryUpdateManyWithWhereWithoutActivityInput[]
    deleteMany?: TileHistoryScalarWhereInput | TileHistoryScalarWhereInput[]
  }

  export type TileHistoryUncheckedUpdateManyWithoutActivityNestedInput = {
    create?: XOR<TileHistoryCreateWithoutActivityInput, TileHistoryUncheckedCreateWithoutActivityInput> | TileHistoryCreateWithoutActivityInput[] | TileHistoryUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: TileHistoryCreateOrConnectWithoutActivityInput | TileHistoryCreateOrConnectWithoutActivityInput[]
    upsert?: TileHistoryUpsertWithWhereUniqueWithoutActivityInput | TileHistoryUpsertWithWhereUniqueWithoutActivityInput[]
    createMany?: TileHistoryCreateManyActivityInputEnvelope
    set?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    disconnect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    delete?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    connect?: TileHistoryWhereUniqueInput | TileHistoryWhereUniqueInput[]
    update?: TileHistoryUpdateWithWhereUniqueWithoutActivityInput | TileHistoryUpdateWithWhereUniqueWithoutActivityInput[]
    updateMany?: TileHistoryUpdateManyWithWhereWithoutActivityInput | TileHistoryUpdateManyWithWhereWithoutActivityInput[]
    deleteMany?: TileHistoryScalarWhereInput | TileHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTilesInput = {
    create?: XOR<UserCreateWithoutTilesInput, UserUncheckedCreateWithoutTilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTilesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTilesNestedInput = {
    create?: XOR<UserCreateWithoutTilesInput, UserUncheckedCreateWithoutTilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTilesInput
    upsert?: UserUpsertWithoutTilesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTilesInput, UserUpdateWithoutTilesInput>, UserUncheckedUpdateWithoutTilesInput>
  }

  export type UserCreateNestedOneWithoutHistoryCapturedInput = {
    create?: XOR<UserCreateWithoutHistoryCapturedInput, UserUncheckedCreateWithoutHistoryCapturedInput>
    connectOrCreate?: UserCreateOrConnectWithoutHistoryCapturedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutHistoryLostInput = {
    create?: XOR<UserCreateWithoutHistoryLostInput, UserUncheckedCreateWithoutHistoryLostInput>
    connectOrCreate?: UserCreateOrConnectWithoutHistoryLostInput
    connect?: UserWhereUniqueInput
  }

  export type ActivityCreateNestedOneWithoutTileHistoryInput = {
    create?: XOR<ActivityCreateWithoutTileHistoryInput, ActivityUncheckedCreateWithoutTileHistoryInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutTileHistoryInput
    connect?: ActivityWhereUniqueInput
  }

  export type UserUpdateOneWithoutHistoryCapturedNestedInput = {
    create?: XOR<UserCreateWithoutHistoryCapturedInput, UserUncheckedCreateWithoutHistoryCapturedInput>
    connectOrCreate?: UserCreateOrConnectWithoutHistoryCapturedInput
    upsert?: UserUpsertWithoutHistoryCapturedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHistoryCapturedInput, UserUpdateWithoutHistoryCapturedInput>, UserUncheckedUpdateWithoutHistoryCapturedInput>
  }

  export type UserUpdateOneWithoutHistoryLostNestedInput = {
    create?: XOR<UserCreateWithoutHistoryLostInput, UserUncheckedCreateWithoutHistoryLostInput>
    connectOrCreate?: UserCreateOrConnectWithoutHistoryLostInput
    upsert?: UserUpsertWithoutHistoryLostInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHistoryLostInput, UserUpdateWithoutHistoryLostInput>, UserUncheckedUpdateWithoutHistoryLostInput>
  }

  export type ActivityUpdateOneWithoutTileHistoryNestedInput = {
    create?: XOR<ActivityCreateWithoutTileHistoryInput, ActivityUncheckedCreateWithoutTileHistoryInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutTileHistoryInput
    upsert?: ActivityUpsertWithoutTileHistoryInput
    disconnect?: ActivityWhereInput | boolean
    delete?: ActivityWhereInput | boolean
    connect?: ActivityWhereUniqueInput
    update?: XOR<XOR<ActivityUpdateToOneWithWhereWithoutTileHistoryInput, ActivityUpdateWithoutTileHistoryInput>, ActivityUncheckedUpdateWithoutTileHistoryInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ActivityCreateWithoutUserInput = {
    stravaId?: bigint | number | null
    source?: string
    name?: string | null
    distanceM?: number | null
    movingTimeS?: number | null
    startLat?: number | null
    startLng?: number | null
    endLat?: number | null
    endLng?: number | null
    polyline?: string | null
    captured?: boolean
    createdAt?: Date | string
    tileHistory?: TileHistoryCreateNestedManyWithoutActivityInput
  }

  export type ActivityUncheckedCreateWithoutUserInput = {
    id?: number
    stravaId?: bigint | number | null
    source?: string
    name?: string | null
    distanceM?: number | null
    movingTimeS?: number | null
    startLat?: number | null
    startLng?: number | null
    endLat?: number | null
    endLng?: number | null
    polyline?: string | null
    captured?: boolean
    createdAt?: Date | string
    tileHistory?: TileHistoryUncheckedCreateNestedManyWithoutActivityInput
  }

  export type ActivityCreateOrConnectWithoutUserInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityCreateManyUserInputEnvelope = {
    data: ActivityCreateManyUserInput | ActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TileOwnershipCreateWithoutUserInput = {
    tileId: string
    createdAt?: Date | string
  }

  export type TileOwnershipUncheckedCreateWithoutUserInput = {
    id?: number
    tileId: string
    createdAt?: Date | string
  }

  export type TileOwnershipCreateOrConnectWithoutUserInput = {
    where: TileOwnershipWhereUniqueInput
    create: XOR<TileOwnershipCreateWithoutUserInput, TileOwnershipUncheckedCreateWithoutUserInput>
  }

  export type TileOwnershipCreateManyUserInputEnvelope = {
    data: TileOwnershipCreateManyUserInput | TileOwnershipCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TileHistoryCreateWithoutUserNewInput = {
    tileId: string
    createdAt?: Date | string
    userPrev?: UserCreateNestedOneWithoutHistoryLostInput
    activity?: ActivityCreateNestedOneWithoutTileHistoryInput
  }

  export type TileHistoryUncheckedCreateWithoutUserNewInput = {
    id?: number
    tileId: string
    previousUser?: number | null
    activityId?: number | null
    createdAt?: Date | string
  }

  export type TileHistoryCreateOrConnectWithoutUserNewInput = {
    where: TileHistoryWhereUniqueInput
    create: XOR<TileHistoryCreateWithoutUserNewInput, TileHistoryUncheckedCreateWithoutUserNewInput>
  }

  export type TileHistoryCreateManyUserNewInputEnvelope = {
    data: TileHistoryCreateManyUserNewInput | TileHistoryCreateManyUserNewInput[]
    skipDuplicates?: boolean
  }

  export type TileHistoryCreateWithoutUserPrevInput = {
    tileId: string
    createdAt?: Date | string
    userNew?: UserCreateNestedOneWithoutHistoryCapturedInput
    activity?: ActivityCreateNestedOneWithoutTileHistoryInput
  }

  export type TileHistoryUncheckedCreateWithoutUserPrevInput = {
    id?: number
    tileId: string
    newUser: number
    activityId?: number | null
    createdAt?: Date | string
  }

  export type TileHistoryCreateOrConnectWithoutUserPrevInput = {
    where: TileHistoryWhereUniqueInput
    create: XOR<TileHistoryCreateWithoutUserPrevInput, TileHistoryUncheckedCreateWithoutUserPrevInput>
  }

  export type TileHistoryCreateManyUserPrevInputEnvelope = {
    data: TileHistoryCreateManyUserPrevInput | TileHistoryCreateManyUserPrevInput[]
    skipDuplicates?: boolean
  }

  export type ActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
  }

  export type ActivityUpdateManyWithWhereWithoutUserInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: IntFilter<"Activity"> | number
    stravaId?: BigIntNullableFilter<"Activity"> | bigint | number | null
    userId?: IntFilter<"Activity"> | number
    source?: StringFilter<"Activity"> | string
    name?: StringNullableFilter<"Activity"> | string | null
    distanceM?: FloatNullableFilter<"Activity"> | number | null
    movingTimeS?: IntNullableFilter<"Activity"> | number | null
    startLat?: FloatNullableFilter<"Activity"> | number | null
    startLng?: FloatNullableFilter<"Activity"> | number | null
    endLat?: FloatNullableFilter<"Activity"> | number | null
    endLng?: FloatNullableFilter<"Activity"> | number | null
    polyline?: StringNullableFilter<"Activity"> | string | null
    captured?: BoolFilter<"Activity"> | boolean
    createdAt?: DateTimeFilter<"Activity"> | Date | string
  }

  export type TileOwnershipUpsertWithWhereUniqueWithoutUserInput = {
    where: TileOwnershipWhereUniqueInput
    update: XOR<TileOwnershipUpdateWithoutUserInput, TileOwnershipUncheckedUpdateWithoutUserInput>
    create: XOR<TileOwnershipCreateWithoutUserInput, TileOwnershipUncheckedCreateWithoutUserInput>
  }

  export type TileOwnershipUpdateWithWhereUniqueWithoutUserInput = {
    where: TileOwnershipWhereUniqueInput
    data: XOR<TileOwnershipUpdateWithoutUserInput, TileOwnershipUncheckedUpdateWithoutUserInput>
  }

  export type TileOwnershipUpdateManyWithWhereWithoutUserInput = {
    where: TileOwnershipScalarWhereInput
    data: XOR<TileOwnershipUpdateManyMutationInput, TileOwnershipUncheckedUpdateManyWithoutUserInput>
  }

  export type TileOwnershipScalarWhereInput = {
    AND?: TileOwnershipScalarWhereInput | TileOwnershipScalarWhereInput[]
    OR?: TileOwnershipScalarWhereInput[]
    NOT?: TileOwnershipScalarWhereInput | TileOwnershipScalarWhereInput[]
    id?: IntFilter<"TileOwnership"> | number
    userId?: IntFilter<"TileOwnership"> | number
    tileId?: StringFilter<"TileOwnership"> | string
    createdAt?: DateTimeFilter<"TileOwnership"> | Date | string
  }

  export type TileHistoryUpsertWithWhereUniqueWithoutUserNewInput = {
    where: TileHistoryWhereUniqueInput
    update: XOR<TileHistoryUpdateWithoutUserNewInput, TileHistoryUncheckedUpdateWithoutUserNewInput>
    create: XOR<TileHistoryCreateWithoutUserNewInput, TileHistoryUncheckedCreateWithoutUserNewInput>
  }

  export type TileHistoryUpdateWithWhereUniqueWithoutUserNewInput = {
    where: TileHistoryWhereUniqueInput
    data: XOR<TileHistoryUpdateWithoutUserNewInput, TileHistoryUncheckedUpdateWithoutUserNewInput>
  }

  export type TileHistoryUpdateManyWithWhereWithoutUserNewInput = {
    where: TileHistoryScalarWhereInput
    data: XOR<TileHistoryUpdateManyMutationInput, TileHistoryUncheckedUpdateManyWithoutUserNewInput>
  }

  export type TileHistoryScalarWhereInput = {
    AND?: TileHistoryScalarWhereInput | TileHistoryScalarWhereInput[]
    OR?: TileHistoryScalarWhereInput[]
    NOT?: TileHistoryScalarWhereInput | TileHistoryScalarWhereInput[]
    id?: IntFilter<"TileHistory"> | number
    tileId?: StringFilter<"TileHistory"> | string
    previousUser?: IntNullableFilter<"TileHistory"> | number | null
    newUser?: IntFilter<"TileHistory"> | number
    activityId?: IntNullableFilter<"TileHistory"> | number | null
    createdAt?: DateTimeFilter<"TileHistory"> | Date | string
  }

  export type TileHistoryUpsertWithWhereUniqueWithoutUserPrevInput = {
    where: TileHistoryWhereUniqueInput
    update: XOR<TileHistoryUpdateWithoutUserPrevInput, TileHistoryUncheckedUpdateWithoutUserPrevInput>
    create: XOR<TileHistoryCreateWithoutUserPrevInput, TileHistoryUncheckedCreateWithoutUserPrevInput>
  }

  export type TileHistoryUpdateWithWhereUniqueWithoutUserPrevInput = {
    where: TileHistoryWhereUniqueInput
    data: XOR<TileHistoryUpdateWithoutUserPrevInput, TileHistoryUncheckedUpdateWithoutUserPrevInput>
  }

  export type TileHistoryUpdateManyWithWhereWithoutUserPrevInput = {
    where: TileHistoryScalarWhereInput
    data: XOR<TileHistoryUpdateManyMutationInput, TileHistoryUncheckedUpdateManyWithoutUserPrevInput>
  }

  export type UserCreateWithoutActivitiesInput = {
    stravaAthleteId: bigint | number
    username?: string | null
    firstname?: string | null
    lastname?: string | null
    profile?: string | null
    createdAt?: Date | string
    tiles?: TileOwnershipCreateNestedManyWithoutUserInput
    historyCaptured?: TileHistoryCreateNestedManyWithoutUserNewInput
    historyLost?: TileHistoryCreateNestedManyWithoutUserPrevInput
  }

  export type UserUncheckedCreateWithoutActivitiesInput = {
    id?: number
    stravaAthleteId: bigint | number
    username?: string | null
    firstname?: string | null
    lastname?: string | null
    profile?: string | null
    createdAt?: Date | string
    tiles?: TileOwnershipUncheckedCreateNestedManyWithoutUserInput
    historyCaptured?: TileHistoryUncheckedCreateNestedManyWithoutUserNewInput
    historyLost?: TileHistoryUncheckedCreateNestedManyWithoutUserPrevInput
  }

  export type UserCreateOrConnectWithoutActivitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
  }

  export type TileHistoryCreateWithoutActivityInput = {
    tileId: string
    createdAt?: Date | string
    userNew?: UserCreateNestedOneWithoutHistoryCapturedInput
    userPrev?: UserCreateNestedOneWithoutHistoryLostInput
  }

  export type TileHistoryUncheckedCreateWithoutActivityInput = {
    id?: number
    tileId: string
    previousUser?: number | null
    newUser: number
    createdAt?: Date | string
  }

  export type TileHistoryCreateOrConnectWithoutActivityInput = {
    where: TileHistoryWhereUniqueInput
    create: XOR<TileHistoryCreateWithoutActivityInput, TileHistoryUncheckedCreateWithoutActivityInput>
  }

  export type TileHistoryCreateManyActivityInputEnvelope = {
    data: TileHistoryCreateManyActivityInput | TileHistoryCreateManyActivityInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutActivitiesInput = {
    update: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateWithoutActivitiesInput = {
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tiles?: TileOwnershipUpdateManyWithoutUserNestedInput
    historyCaptured?: TileHistoryUpdateManyWithoutUserNewNestedInput
    historyLost?: TileHistoryUpdateManyWithoutUserPrevNestedInput
  }

  export type UserUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tiles?: TileOwnershipUncheckedUpdateManyWithoutUserNestedInput
    historyCaptured?: TileHistoryUncheckedUpdateManyWithoutUserNewNestedInput
    historyLost?: TileHistoryUncheckedUpdateManyWithoutUserPrevNestedInput
  }

  export type TileHistoryUpsertWithWhereUniqueWithoutActivityInput = {
    where: TileHistoryWhereUniqueInput
    update: XOR<TileHistoryUpdateWithoutActivityInput, TileHistoryUncheckedUpdateWithoutActivityInput>
    create: XOR<TileHistoryCreateWithoutActivityInput, TileHistoryUncheckedCreateWithoutActivityInput>
  }

  export type TileHistoryUpdateWithWhereUniqueWithoutActivityInput = {
    where: TileHistoryWhereUniqueInput
    data: XOR<TileHistoryUpdateWithoutActivityInput, TileHistoryUncheckedUpdateWithoutActivityInput>
  }

  export type TileHistoryUpdateManyWithWhereWithoutActivityInput = {
    where: TileHistoryScalarWhereInput
    data: XOR<TileHistoryUpdateManyMutationInput, TileHistoryUncheckedUpdateManyWithoutActivityInput>
  }

  export type UserCreateWithoutTilesInput = {
    stravaAthleteId: bigint | number
    username?: string | null
    firstname?: string | null
    lastname?: string | null
    profile?: string | null
    createdAt?: Date | string
    activities?: ActivityCreateNestedManyWithoutUserInput
    historyCaptured?: TileHistoryCreateNestedManyWithoutUserNewInput
    historyLost?: TileHistoryCreateNestedManyWithoutUserPrevInput
  }

  export type UserUncheckedCreateWithoutTilesInput = {
    id?: number
    stravaAthleteId: bigint | number
    username?: string | null
    firstname?: string | null
    lastname?: string | null
    profile?: string | null
    createdAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    historyCaptured?: TileHistoryUncheckedCreateNestedManyWithoutUserNewInput
    historyLost?: TileHistoryUncheckedCreateNestedManyWithoutUserPrevInput
  }

  export type UserCreateOrConnectWithoutTilesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTilesInput, UserUncheckedCreateWithoutTilesInput>
  }

  export type UserUpsertWithoutTilesInput = {
    update: XOR<UserUpdateWithoutTilesInput, UserUncheckedUpdateWithoutTilesInput>
    create: XOR<UserCreateWithoutTilesInput, UserUncheckedCreateWithoutTilesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTilesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTilesInput, UserUncheckedUpdateWithoutTilesInput>
  }

  export type UserUpdateWithoutTilesInput = {
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    historyCaptured?: TileHistoryUpdateManyWithoutUserNewNestedInput
    historyLost?: TileHistoryUpdateManyWithoutUserPrevNestedInput
  }

  export type UserUncheckedUpdateWithoutTilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    historyCaptured?: TileHistoryUncheckedUpdateManyWithoutUserNewNestedInput
    historyLost?: TileHistoryUncheckedUpdateManyWithoutUserPrevNestedInput
  }

  export type UserCreateWithoutHistoryCapturedInput = {
    stravaAthleteId: bigint | number
    username?: string | null
    firstname?: string | null
    lastname?: string | null
    profile?: string | null
    createdAt?: Date | string
    activities?: ActivityCreateNestedManyWithoutUserInput
    tiles?: TileOwnershipCreateNestedManyWithoutUserInput
    historyLost?: TileHistoryCreateNestedManyWithoutUserPrevInput
  }

  export type UserUncheckedCreateWithoutHistoryCapturedInput = {
    id?: number
    stravaAthleteId: bigint | number
    username?: string | null
    firstname?: string | null
    lastname?: string | null
    profile?: string | null
    createdAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    tiles?: TileOwnershipUncheckedCreateNestedManyWithoutUserInput
    historyLost?: TileHistoryUncheckedCreateNestedManyWithoutUserPrevInput
  }

  export type UserCreateOrConnectWithoutHistoryCapturedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHistoryCapturedInput, UserUncheckedCreateWithoutHistoryCapturedInput>
  }

  export type UserCreateWithoutHistoryLostInput = {
    stravaAthleteId: bigint | number
    username?: string | null
    firstname?: string | null
    lastname?: string | null
    profile?: string | null
    createdAt?: Date | string
    activities?: ActivityCreateNestedManyWithoutUserInput
    tiles?: TileOwnershipCreateNestedManyWithoutUserInput
    historyCaptured?: TileHistoryCreateNestedManyWithoutUserNewInput
  }

  export type UserUncheckedCreateWithoutHistoryLostInput = {
    id?: number
    stravaAthleteId: bigint | number
    username?: string | null
    firstname?: string | null
    lastname?: string | null
    profile?: string | null
    createdAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    tiles?: TileOwnershipUncheckedCreateNestedManyWithoutUserInput
    historyCaptured?: TileHistoryUncheckedCreateNestedManyWithoutUserNewInput
  }

  export type UserCreateOrConnectWithoutHistoryLostInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHistoryLostInput, UserUncheckedCreateWithoutHistoryLostInput>
  }

  export type ActivityCreateWithoutTileHistoryInput = {
    stravaId?: bigint | number | null
    source?: string
    name?: string | null
    distanceM?: number | null
    movingTimeS?: number | null
    startLat?: number | null
    startLng?: number | null
    endLat?: number | null
    endLng?: number | null
    polyline?: string | null
    captured?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutTileHistoryInput = {
    id?: number
    stravaId?: bigint | number | null
    userId: number
    source?: string
    name?: string | null
    distanceM?: number | null
    movingTimeS?: number | null
    startLat?: number | null
    startLng?: number | null
    endLat?: number | null
    endLng?: number | null
    polyline?: string | null
    captured?: boolean
    createdAt?: Date | string
  }

  export type ActivityCreateOrConnectWithoutTileHistoryInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutTileHistoryInput, ActivityUncheckedCreateWithoutTileHistoryInput>
  }

  export type UserUpsertWithoutHistoryCapturedInput = {
    update: XOR<UserUpdateWithoutHistoryCapturedInput, UserUncheckedUpdateWithoutHistoryCapturedInput>
    create: XOR<UserCreateWithoutHistoryCapturedInput, UserUncheckedCreateWithoutHistoryCapturedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHistoryCapturedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHistoryCapturedInput, UserUncheckedUpdateWithoutHistoryCapturedInput>
  }

  export type UserUpdateWithoutHistoryCapturedInput = {
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    tiles?: TileOwnershipUpdateManyWithoutUserNestedInput
    historyLost?: TileHistoryUpdateManyWithoutUserPrevNestedInput
  }

  export type UserUncheckedUpdateWithoutHistoryCapturedInput = {
    id?: IntFieldUpdateOperationsInput | number
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    tiles?: TileOwnershipUncheckedUpdateManyWithoutUserNestedInput
    historyLost?: TileHistoryUncheckedUpdateManyWithoutUserPrevNestedInput
  }

  export type UserUpsertWithoutHistoryLostInput = {
    update: XOR<UserUpdateWithoutHistoryLostInput, UserUncheckedUpdateWithoutHistoryLostInput>
    create: XOR<UserCreateWithoutHistoryLostInput, UserUncheckedCreateWithoutHistoryLostInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHistoryLostInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHistoryLostInput, UserUncheckedUpdateWithoutHistoryLostInput>
  }

  export type UserUpdateWithoutHistoryLostInput = {
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    tiles?: TileOwnershipUpdateManyWithoutUserNestedInput
    historyCaptured?: TileHistoryUpdateManyWithoutUserNewNestedInput
  }

  export type UserUncheckedUpdateWithoutHistoryLostInput = {
    id?: IntFieldUpdateOperationsInput | number
    stravaAthleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    tiles?: TileOwnershipUncheckedUpdateManyWithoutUserNestedInput
    historyCaptured?: TileHistoryUncheckedUpdateManyWithoutUserNewNestedInput
  }

  export type ActivityUpsertWithoutTileHistoryInput = {
    update: XOR<ActivityUpdateWithoutTileHistoryInput, ActivityUncheckedUpdateWithoutTileHistoryInput>
    create: XOR<ActivityCreateWithoutTileHistoryInput, ActivityUncheckedCreateWithoutTileHistoryInput>
    where?: ActivityWhereInput
  }

  export type ActivityUpdateToOneWithWhereWithoutTileHistoryInput = {
    where?: ActivityWhereInput
    data: XOR<ActivityUpdateWithoutTileHistoryInput, ActivityUncheckedUpdateWithoutTileHistoryInput>
  }

  export type ActivityUpdateWithoutTileHistoryInput = {
    stravaId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    source?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    distanceM?: NullableFloatFieldUpdateOperationsInput | number | null
    movingTimeS?: NullableIntFieldUpdateOperationsInput | number | null
    startLat?: NullableFloatFieldUpdateOperationsInput | number | null
    startLng?: NullableFloatFieldUpdateOperationsInput | number | null
    endLat?: NullableFloatFieldUpdateOperationsInput | number | null
    endLng?: NullableFloatFieldUpdateOperationsInput | number | null
    polyline?: NullableStringFieldUpdateOperationsInput | string | null
    captured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutTileHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    stravaId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    userId?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    distanceM?: NullableFloatFieldUpdateOperationsInput | number | null
    movingTimeS?: NullableIntFieldUpdateOperationsInput | number | null
    startLat?: NullableFloatFieldUpdateOperationsInput | number | null
    startLng?: NullableFloatFieldUpdateOperationsInput | number | null
    endLat?: NullableFloatFieldUpdateOperationsInput | number | null
    endLng?: NullableFloatFieldUpdateOperationsInput | number | null
    polyline?: NullableStringFieldUpdateOperationsInput | string | null
    captured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateManyUserInput = {
    id?: number
    stravaId?: bigint | number | null
    source?: string
    name?: string | null
    distanceM?: number | null
    movingTimeS?: number | null
    startLat?: number | null
    startLng?: number | null
    endLat?: number | null
    endLng?: number | null
    polyline?: string | null
    captured?: boolean
    createdAt?: Date | string
  }

  export type TileOwnershipCreateManyUserInput = {
    id?: number
    tileId: string
    createdAt?: Date | string
  }

  export type TileHistoryCreateManyUserNewInput = {
    id?: number
    tileId: string
    previousUser?: number | null
    activityId?: number | null
    createdAt?: Date | string
  }

  export type TileHistoryCreateManyUserPrevInput = {
    id?: number
    tileId: string
    newUser: number
    activityId?: number | null
    createdAt?: Date | string
  }

  export type ActivityUpdateWithoutUserInput = {
    stravaId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    source?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    distanceM?: NullableFloatFieldUpdateOperationsInput | number | null
    movingTimeS?: NullableIntFieldUpdateOperationsInput | number | null
    startLat?: NullableFloatFieldUpdateOperationsInput | number | null
    startLng?: NullableFloatFieldUpdateOperationsInput | number | null
    endLat?: NullableFloatFieldUpdateOperationsInput | number | null
    endLng?: NullableFloatFieldUpdateOperationsInput | number | null
    polyline?: NullableStringFieldUpdateOperationsInput | string | null
    captured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tileHistory?: TileHistoryUpdateManyWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    stravaId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    source?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    distanceM?: NullableFloatFieldUpdateOperationsInput | number | null
    movingTimeS?: NullableIntFieldUpdateOperationsInput | number | null
    startLat?: NullableFloatFieldUpdateOperationsInput | number | null
    startLng?: NullableFloatFieldUpdateOperationsInput | number | null
    endLat?: NullableFloatFieldUpdateOperationsInput | number | null
    endLng?: NullableFloatFieldUpdateOperationsInput | number | null
    polyline?: NullableStringFieldUpdateOperationsInput | string | null
    captured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tileHistory?: TileHistoryUncheckedUpdateManyWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    stravaId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    source?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    distanceM?: NullableFloatFieldUpdateOperationsInput | number | null
    movingTimeS?: NullableIntFieldUpdateOperationsInput | number | null
    startLat?: NullableFloatFieldUpdateOperationsInput | number | null
    startLng?: NullableFloatFieldUpdateOperationsInput | number | null
    endLat?: NullableFloatFieldUpdateOperationsInput | number | null
    endLng?: NullableFloatFieldUpdateOperationsInput | number | null
    polyline?: NullableStringFieldUpdateOperationsInput | string | null
    captured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileOwnershipUpdateWithoutUserInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileOwnershipUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileOwnershipUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileHistoryUpdateWithoutUserNewInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userPrev?: UserUpdateOneWithoutHistoryLostNestedInput
    activity?: ActivityUpdateOneWithoutTileHistoryNestedInput
  }

  export type TileHistoryUncheckedUpdateWithoutUserNewInput = {
    id?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    previousUser?: NullableIntFieldUpdateOperationsInput | number | null
    activityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileHistoryUncheckedUpdateManyWithoutUserNewInput = {
    id?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    previousUser?: NullableIntFieldUpdateOperationsInput | number | null
    activityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileHistoryUpdateWithoutUserPrevInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNew?: UserUpdateOneWithoutHistoryCapturedNestedInput
    activity?: ActivityUpdateOneWithoutTileHistoryNestedInput
  }

  export type TileHistoryUncheckedUpdateWithoutUserPrevInput = {
    id?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    newUser?: IntFieldUpdateOperationsInput | number
    activityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileHistoryUncheckedUpdateManyWithoutUserPrevInput = {
    id?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    newUser?: IntFieldUpdateOperationsInput | number
    activityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileHistoryCreateManyActivityInput = {
    id?: number
    tileId: string
    previousUser?: number | null
    newUser: number
    createdAt?: Date | string
  }

  export type TileHistoryUpdateWithoutActivityInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNew?: UserUpdateOneWithoutHistoryCapturedNestedInput
    userPrev?: UserUpdateOneWithoutHistoryLostNestedInput
  }

  export type TileHistoryUncheckedUpdateWithoutActivityInput = {
    id?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    previousUser?: NullableIntFieldUpdateOperationsInput | number | null
    newUser?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TileHistoryUncheckedUpdateManyWithoutActivityInput = {
    id?: IntFieldUpdateOperationsInput | number
    tileId?: StringFieldUpdateOperationsInput | string
    previousUser?: NullableIntFieldUpdateOperationsInput | number | null
    newUser?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}