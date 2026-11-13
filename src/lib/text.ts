/** True when the string has Arabic-script letters. */
export const hasArabic = (s: string) => /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/.test(s);
