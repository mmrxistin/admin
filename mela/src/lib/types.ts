// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirahmanirahim
// Elhamdulillahirabbilalemin
// Es-selatu ve Es-selamu ala Resulina Muhammedin
// SüphanAllah, Elhamdulillah, Allahu Ekber
// La ilahe illAllah u vahdehu la şerike leh, lehul-mulku ve lehul-hamdu.
// Yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir
// Allah u Ekber Ve Lillahil Hamd
//  ve huve ala kulli şey'in kadir
// Allahu Ekber, Allahu Ekber, Allahu Ekber, La ilahe illAllah
// Bila Allah Azze ve Celle me ji sunneta Resulullah Muhammed (s.a.v) neqetine, amin rabbal alemin
// Xeyni Allah tu Xweda tune
// Allahu Ekber Ve Lillahil Hamd
import { Prisma } from "@prisma/client";

// ============================================
// USER SELECT
// ============================================

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

// ============================================
// GENERIC INCLUDE HELPER (DRY - Don't Repeat Yourself)
// ============================================

/**
 * Generic function to get include object for any content model
 * @param loggedInUserId - The ID of the currently logged-in user
 * @returns Include object with user and attachments
 */
export function getContentInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    attachments: true,
  } as const;
}

// ============================================
// TYPE HELPERS (Generic)
// ============================================

export type ContentData<T> = Prisma.YekGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}> & T;

export interface ContentPage<T> {
  items: T[];
  nextCursor: string | null;
}

// ============================================
// MODEL-SPECIFIC TYPES
// ============================================

// Yek
export type YekData = Prisma.YekGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}>;

export interface YekPage {
  posts: YekData[];
  nextCursor: string | null;
}

// yekayeke
export type yekayekeData = Prisma.yekayekeGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}>;

export interface yekayekePage {
  items: yekayekeData[];
  nextCursor: string | null;
}

// Tefsir
export type TefsirData = Prisma.TefsirGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}>;

export interface TefsirPage {
  items: TefsirData[];
  nextCursor: string | null;
}

// Car
export type CarData = Prisma.CarGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}>;

export interface CarPage {
  posts: CarData[];
  nextCursor: string | null;
}

// du
export type duData = Prisma.duGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}>;

export interface duPage {
  items: duData[];
  nextCursor: string | null;
}

// se
export type seData = Prisma.seGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}>;

export interface sePage {
  items: seData[];
  nextCursor: string | null;
}

// Penc
export type PencData = Prisma.PencGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}>;

export interface PencPage {
  items: PencData[];
  nextCursor: string | null;
}

// Xane
export type XaneData = Prisma.XaneGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}>;

export interface XanePage {
  items: XaneData[];
  nextCursor: string | null;
}

// Dirok
export type DirokData = Prisma.DirokGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}>;

export interface DirokPage {
  items: DirokData[];
  nextCursor: string | null;
}

// Rojname
export type RojnameData = Prisma.RojnameGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}>;

export interface RojnamePage {
  items: RojnameData[];
  nextCursor: string | null;
}

// Duyem
export type DuyemData = Prisma.DuyemGetPayload<{
  include: ReturnType<typeof getContentInclude>;
}>;

export interface DuyemPage {
  items: DuyemData[];
  nextCursor: string | null;
}

// ============================================
// OTHER TYPES
// ============================================

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

export interface Attachment {
  file: File;
  mediaId?: string;
  url?: string;
  type?: string;
  isUploading: boolean;
}

// ============================================
// LEGACY / DEPRECATED (kept for backward compatibility)
// ============================================

// @deprecated Use getContentInclude instead
export function getYekInclude(loggedInUserId: string) {
  return getContentInclude(loggedInUserId);
}

// @deprecated Use getContentInclude instead
export function getyekayekeInclude(loggedInUserId: string) {
  return getContentInclude(loggedInUserId);
}

// @deprecated Use getContentInclude instead
export function getTefsirInclude(loggedInUserId: string) {
  return getContentInclude(loggedInUserId);
}

// @deprecated Use getContentInclude instead
export function getCarDataInclude(loggedInUserId: string) {
  return getContentInclude(loggedInUserId);
}

// @deprecated Use getContentInclude instead
export function getduInclude(loggedInUserId: string) {
  return getContentInclude(loggedInUserId);
}

// @deprecated Use getContentInclude instead
export function getseInclude(loggedInUserId: string) {
  return getContentInclude(loggedInUserId);
}

// @deprecated Use getContentInclude instead
export function getPencInclude(loggedInUserId: string) {
  return getContentInclude(loggedInUserId);
}

// @deprecated Use getContentInclude instead
export function getXaneInclude(loggedInUserId: string) {
  return getContentInclude(loggedInUserId);
}

// @deprecated Use getContentInclude instead
export function getDirokInclude(loggedInUserId: string) {
  return getContentInclude(loggedInUserId);
}

// @deprecated Use getContentInclude instead
export function getRojnameInclude(loggedInUserId: string) {
  return getContentInclude(loggedInUserId);
}

// @deprecated Use getContentInclude instead
export function getDuyemInclude(loggedInUserId: string) {
  return getContentInclude(loggedInUserId);
}