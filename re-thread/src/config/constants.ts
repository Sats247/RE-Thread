/**
 * Business rule constants for the RE-thread platform.
 * All values are placeholders to be confirmed; change here only.
 */

/** Platform fee percentage for sale listings without returns enabled */
export const PLATFORM_FEE_SALE_NO_RETURNS = 0.12; // 12%

/** Platform fee percentage for sale listings with returns enabled */
export const PLATFORM_FEE_SALE_WITH_RETURNS = 0.08; // 8%

/** Platform fee percentage for rental listings */
export const PLATFORM_FEE_RENTAL = 0.15; // 15%

/** Return window options in days */
export const RETURN_WINDOW_OPTIONS: number[] = [3, 7];

/** Default return window in days */
export const RETURN_WINDOW_DEFAULT = 3;

/** Flat courier charge per seller group (INR) */
export const COURIER_CHARGE_FLAT = 70;

/** Minimum order value for free courier (INR) */
export const COURIER_FREE_THRESHOLD = 999;

/** Courier charge for meetup delivery */
export const COURIER_CHARGE_MEETUP = 0;

/** Available rental tier durations in days */
export const RENTAL_TIERS: number[] = [3, 5, 7];

/** Number of free product views allowed for guests */
export const GUEST_PRODUCT_VIEW_LIMIT = 3;

/** Minimum successful sales for auto-verification */
export const AUTO_VERIFY_MIN_SALES = 10;

/** Minimum seller rating for auto-verification */
export const AUTO_VERIFY_MIN_RATING = 4.0;

/** Ranking boost multiplier for verified sellers in Recommended sort */
export const VERIFIED_SELLER_BOOST = 1.3;

/** Demo OTP / 2FA code */
export const DEMO_OTP_CODE = '123456';
export const OTP_DEMO_CODE = DEMO_OTP_CODE;
export const TWOFACTOR_DEMO_CODE = DEMO_OTP_CODE;

// Aliases for build plan specifications
export const PLATFORM_FEE_SALE_NO_RETURN = PLATFORM_FEE_SALE_NO_RETURNS;
export const PLATFORM_FEE_SALE_WITH_RETURN = PLATFORM_FEE_SALE_WITH_RETURNS;
export const COURIER_CHARGE = COURIER_CHARGE_FLAT;

/** LocalStorage key prefix */
export const LS_PREFIX = 'rt:';
