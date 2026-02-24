#!/usr/bin/env bash
set -e
export PATH="/Library/TeX/texbin:$PATH"

REPORTS_DIR="/Users/tdupoiron/Documents/github/repositories/discover-guadeloupe/.github/skills/ui-accessibility/reports"
SRC="$REPORTS_DIR/2026-02-24-accessibility-report.pdf.md"
OUT="$REPORTS_DIR/2026-02-24-accessibility-report.pdf"
TMP="$REPORTS_DIR/_clean-source.md"

# Pre-process: replace emoji and special chars XeLaTeX can't render
sed \
  -e 's/✨/(sparkles)/g' \
  -e 's/🎉/(celebration)/g' \
  -e 's/⚠/(warning)/g' \
  -e 's/✅/(ok)/g' \
  -e 's/☑/[x]/g' \
  -e 's/☐/[ ]/g' \
  -e 's/&nbsp;/ /g' \
  "$SRC" > "$TMP"

cd "$REPORTS_DIR"

pandoc "$TMP" \
  -o "$OUT" \
  --pdf-engine=xelatex \
  --toc \
  --toc-depth=2 \
  --number-sections \
  --syntax-highlighting=breezedark \
  -V "geometry:top=2.5cm, bottom=2.5cm, left=2.5cm, right=2.5cm" \
  -V mainfont="Helvetica Neue" \
  -V monofont="Menlo" \
  -V colorlinks=true \
  -V urlcolor="blue" \
  -V fontsize=11pt \
  -V linestretch=1.4 \
  -V documentclass=article \
  --metadata title="Accessibility Audit Report" \
  --metadata author="UI Accessibility Auditor" \
  --metadata date="2026-02-24"

rm -f "$TMP"
echo "Done: $OUT"
