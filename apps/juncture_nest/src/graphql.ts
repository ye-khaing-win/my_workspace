
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum SortOrder {
    asc = "asc",
    desc = "desc"
}

export enum Actions {
    LIST = "LIST",
    DETAILS = "DETAILS",
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    RECOVER = "RECOVER"
}

export enum RoleTypes {
    ADMIN = "ADMIN",
    COORDINATOR = "COORDINATOR",
    HR = "HR",
    CUSTOM = "CUSTOM"
}

export class PaginationInput {
    page?: Nullable<number>;
    limit?: Nullable<number>;
}

export class StringOperationsInput {
    and?: Nullable<StringOperationsInput[]>;
    or?: Nullable<StringOperationsInput[]>;
    not?: Nullable<StringOperationsInput>;
    equals?: Nullable<string>;
    in?: Nullable<string[]>;
    notIn?: Nullable<string[]>;
    lt?: Nullable<string>;
    lte?: Nullable<string>;
    gt?: Nullable<string>;
    gte?: Nullable<string>;
    contains?: Nullable<string>;
    startsWith?: Nullable<string>;
    endsWith?: Nullable<string>;
}

export class IntegerOperationsInput {
    and?: Nullable<IntegerOperationsInput[]>;
    or?: Nullable<IntegerOperationsInput[]>;
    not?: Nullable<IntegerOperationsInput>;
    equals?: Nullable<number>;
    in?: Nullable<number[]>;
    notIn?: Nullable<number[]>;
    lt?: Nullable<number>;
    lte?: Nullable<number>;
    gt?: Nullable<number>;
    gte?: Nullable<number>;
}

export class SignupAdminInput {
    name: string;
    email: string;
    companyId: string;
    phoneNumber?: Nullable<string>;
    password?: Nullable<string>;
}

export class InviteMemberInput {
    email: string;
    roleId: string;
}

export class SignupMemberInput {
    name: string;
    email: string;
    phoneNumber?: Nullable<string>;
    password: string;
    otp: string;
}

export class LoginInput {
    name: string;
    password: string;
}

export class CreateCompanyInput {
    name: string;
    description?: Nullable<string>;
    logo?: Nullable<string>;
    banner?: Nullable<string>;
    industryId: string;
    size: CreateSizeInput;
    aboutUs?: Nullable<string>;
    whatWeOffer?: Nullable<string>;
    ourVision?: Nullable<string>;
    ourCulture?: Nullable<string>;
    address?: Nullable<string>;
    websiteLinks?: Nullable<string[]>;
    socialLinks?: Nullable<Nullable<CreateSocialLinkInput>[]>;
    palette?: Nullable<CreatePaletteInput>;
    testimonial?: Nullable<CreateTestimonialInput>;
}

export class UpdateCompanyInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    logo?: Nullable<string>;
    banner?: Nullable<string>;
    industryId?: Nullable<string>;
    size?: Nullable<UpdateSizeInput>;
    aboutUs?: Nullable<string>;
    whatWeOffer?: Nullable<string>;
    ourVision?: Nullable<string>;
    ourCulture?: Nullable<string>;
    address?: Nullable<string>;
    websiteLinks?: Nullable<string[]>;
    socialLinks?: Nullable<Nullable<UpdateSocialLinkInput>[]>;
    palette?: Nullable<CreatePaletteInput>;
    testimonial?: Nullable<CreateTestimonialInput>;
}

export class FilterCompanyInput {
    name?: Nullable<StringOperationsInput>;
    industry?: Nullable<FilterIndustryInput>;
    size?: Nullable<FilterSizeInput>;
}

export class SearchCompanyInput {
    name?: Nullable<string>;
    aboutUs?: Nullable<string>;
}

export class OrderByCompanyInput {
    name?: Nullable<SortOrder>;
    industry?: Nullable<OrderByIndustryInput>;
    size?: Nullable<OrderBySizeInput>;
}

export class CreatePaletteInput {
    primary: string;
    secondary?: Nullable<string>;
    tertiary?: Nullable<string>;
}

export class UpdatePaletteInput {
    primary: string;
    secondary?: Nullable<string>;
    tertiary?: Nullable<string>;
}

export class CreateSizeInput {
    min: number;
    max: number;
}

export class UpdateSizeInput {
    min?: Nullable<number>;
    max?: Nullable<number>;
}

export class FilterSizeInput {
    min?: Nullable<IntegerOperationsInput>;
    max?: Nullable<IntegerOperationsInput>;
}

export class OrderBySizeInput {
    min?: Nullable<SortOrder>;
    max?: Nullable<SortOrder>;
}

export class CreateSocialLinkInput {
    type: string;
    link: string;
}

export class UpdateSocialLinkInput {
    type?: Nullable<string>;
    link?: Nullable<string>;
}

export class CreateTestimonialInput {
    title: string;
    description?: Nullable<string>;
}

export class CreateIndustryInput {
    name: string;
    description?: Nullable<string>;
}

export class UpdateIndustryInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export class FilterIndustryInput {
    name?: Nullable<StringOperationsInput>;
}

export class SearchIndustryInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export class OrderByIndustryInput {
    name?: Nullable<SortOrder>;
    createdAt?: Nullable<SortOrder>;
}

export class CreatePermissionInput {
    name: string;
    description?: Nullable<string>;
    key: string;
    action: Actions;
}

export class UpdatePermissionInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    key?: Nullable<string>;
    action?: Nullable<Actions>;
}

export class CreateRoleInput {
    name: string;
    type: RoleTypes;
    description?: Nullable<string>;
    permissions: Nullable<string>[];
    companyId: string;
}

export class UpdateRoleInput {
    name?: Nullable<string>;
    type?: Nullable<RoleTypes>;
    description?: Nullable<string>;
    permissions?: Nullable<Nullable<string>[]>;
    companyId?: Nullable<string>;
}

export class CreateUserInput {
    name: string;
    email: string;
    roleId: string;
    companyId: string;
    phoneNumber?: Nullable<string>;
    password?: Nullable<string>;
}

export class UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    roleId?: Nullable<string>;
    phoneNumber?: Nullable<string>;
}

export class AuthResponse {
    token: string;
}

export class MessageResponse {
    message: string;
}

export abstract class IMutation {
    abstract signupAdmin(input: SignupAdminInput): AuthResponse | Promise<AuthResponse>;

    abstract inviteCandidate(input: InviteMemberInput): MessageResponse | Promise<MessageResponse>;

    abstract signupMember(input: SignupMemberInput): AuthResponse | Promise<AuthResponse>;

    abstract login(input?: Nullable<LoginInput>): AuthResponse | Promise<AuthResponse>;

    abstract createCompany(input: CreateCompanyInput, logo: Upload): Company | Promise<Company>;

    abstract updateCompany(id: string, input: UpdateCompanyInput): Company | Promise<Company>;

    abstract deleteCompany(id: string): Nullable<Company> | Promise<Nullable<Company>>;

    abstract recoverCompany(id: string): Nullable<Company> | Promise<Nullable<Company>>;

    abstract createIndustry(input: CreateIndustryInput): Industry | Promise<Industry>;

    abstract updateIndustry(id: string, input: UpdateIndustryInput): Industry | Promise<Industry>;

    abstract deleteIndustry(id: string): Nullable<Industry> | Promise<Nullable<Industry>>;

    abstract recoverIndustry(id: string): Nullable<Industry> | Promise<Nullable<Industry>>;

    abstract createPermission(input: CreatePermissionInput): Permission | Promise<Permission>;

    abstract updatePermission(id: string, input: UpdatePermissionInput): Permission | Promise<Permission>;

    abstract deletePermission(id: string): Nullable<Permission> | Promise<Nullable<Permission>>;

    abstract recoverPermission(id: string): Nullable<Permission> | Promise<Nullable<Permission>>;

    abstract createRole(input: CreateRoleInput): Role | Promise<Role>;

    abstract updateRole(id: string, input: UpdateRoleInput): Role | Promise<Role>;

    abstract deleteRole(id: string): Nullable<Role> | Promise<Nullable<Role>>;

    abstract recoverRole(id: string): Nullable<Role> | Promise<Nullable<Role>>;

    abstract createUser(input: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: string, input: UpdateUserInput): User | Promise<User>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract recoverUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract createImage(image: Upload): Image | Promise<Image>;
}

export class Company {
    id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    logo?: Nullable<Logo>;
    banner?: Nullable<string>;
    industry?: Nullable<Industry>;
    size?: Nullable<Size>;
    aboutUs?: Nullable<string>;
    whatWeOffer?: Nullable<string>;
    ourVision?: Nullable<string>;
    ourCulture?: Nullable<string>;
    address?: Nullable<string>;
    websiteLinks?: Nullable<Nullable<string>[]>;
    socialLinks?: Nullable<Nullable<SocialLink>[]>;
    palette?: Nullable<Palette>;
    testimonial?: Nullable<Testimonial>;
    roles?: Nullable<Nullable<Role>[]>;
}

export abstract class IQuery {
    abstract companies(filter?: Nullable<FilterCompanyInput>, search?: Nullable<SearchCompanyInput>, orderBy?: Nullable<OrderByCompanyInput>, pagination?: Nullable<PaginationInput>): Nullable<Company>[] | Promise<Nullable<Company>[]>;

    abstract company(id: string): Nullable<Company> | Promise<Nullable<Company>>;

    abstract industries(filter?: Nullable<FilterIndustryInput>, search?: Nullable<SearchIndustryInput>, orderBy?: Nullable<OrderByIndustryInput>, pagination?: Nullable<PaginationInput>): Nullable<Industry>[] | Promise<Nullable<Industry>[]>;

    abstract industry(id: string): Nullable<Industry> | Promise<Nullable<Industry>>;

    abstract permissions(): Nullable<Permission>[] | Promise<Nullable<Permission>[]>;

    abstract permission(id: string): Nullable<Permission> | Promise<Nullable<Permission>>;

    abstract roles(): Nullable<Role>[] | Promise<Nullable<Role>[]>;

    abstract role(id: string): Nullable<Role> | Promise<Nullable<Role>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Logo {
    key: string;
    name: string;
    mimetype: string;
    encoding?: Nullable<string>;
    url?: Nullable<string>;
}

export class Palette {
    id: string;
    primary: string;
    secondary?: Nullable<string>;
    tertiary?: Nullable<string>;
}

export class Size {
    id: string;
    min: number;
    max: number;
}

export class SocialLink {
    id: string;
    type: string;
    link: string;
    company: Company;
}

export class Testimonial {
    id: string;
    title: string;
    description?: Nullable<string>;
}

export class Industry {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: Nullable<string>;
    name: string;
    description?: Nullable<string>;
}

export class Permission {
    id?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    name?: Nullable<string>;
    key?: Nullable<string>;
    description?: Nullable<string>;
    action?: Nullable<Actions>;
}

export class Role {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    type: RoleTypes;
    description?: Nullable<string>;
    permissions?: Nullable<Nullable<Permission>[]>;
    default?: Nullable<boolean>;
    company?: Nullable<Company>;
}

export class User {
    id?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    role?: Nullable<Role>;
    company?: Nullable<Company>;
    phoneNumber?: Nullable<string>;
}

export class Image {
    key: string;
    name: string;
    mimetype: string;
    encoding?: Nullable<string>;
    url?: Nullable<string>;
}

export type Upload = any;
type Nullable<T> = T | null;
