<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9" exclude-result-prefixes="s">
<xsl:output method="html" encoding="UTF-8" doctype-system="about:legacy-compat"/>
<xsl:template match="/">
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>XML Sitemap — Shobon Mahmud</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#fff;color:#35465a;font:14px/1.55 Arial,Helvetica,sans-serif}header{background:#416ff4;color:white;padding:22px 30px 20px}h1{font-size:32px;font-weight:500;margin:0 0 24px}header p{margin:4px 0;font-size:16px}header a{color:#fff;text-decoration:none;border-bottom:1px dotted #fff}main{max-width:1440px;margin:38px auto;padding:0 24px}main p{margin:0 0 14px}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;text-align:left;font-size:13px}th{background:#416ff4;color:white;padding:16px 12px;font-size:14px;font-weight:700}td{padding:10px 12px;border-bottom:1px solid #ddd}tbody tr:nth-child(even){background:#f7f7f7}tbody tr:hover{background:#eef3ff}td:first-child{width:75%}td:last-child{white-space:nowrap}td a{color:#008cbd;text-decoration:none;overflow-wrap:anywhere}td a:hover{text-decoration:underline}a:focus-visible{outline:2px solid #163dba;outline-offset:4px}.back{display:inline-block;margin-bottom:14px;color:#008cbd}.note{color:#65758a;font-size:12px;margin-top:18px}@media(max-width:600px){header{padding:20px}h1{font-size:27px;margin-bottom:16px}header p{font-size:14px}main{margin:26px auto;padding:0 16px}th,td{padding:12px 10px}td:first-child{width:65%}}
</style></head><body>
<header><h1>XML Sitemap</h1><p>This XML Sitemap is generated automatically for Shobon Mahmud. Search engines use it to discover and crawl published pages on this website.</p><p>Learn more about <a href="https://www.sitemaps.org/">XML Sitemaps</a>.</p></header>
<main>
<xsl:choose><xsl:when test="s:sitemapindex"><p>This XML Sitemap Index file contains <strong><xsl:value-of select="count(s:sitemapindex/s:sitemap)"/></strong> sitemaps.</p></xsl:when><xsl:otherwise><a class="back" href="/sitemap.xml">← Sitemap Index</a><p>This XML Sitemap contains <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong> URLs.</p></xsl:otherwise></xsl:choose>
<div class="table-wrap"><table><thead><tr><th scope="col"><xsl:choose><xsl:when test="s:sitemapindex">Sitemap</xsl:when><xsl:otherwise>URL</xsl:otherwise></xsl:choose></th><th scope="col">Last Modified</th></tr></thead><tbody>
<xsl:for-each select="s:sitemapindex/s:sitemap | s:urlset/s:url"><tr><td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td><td><xsl:choose><xsl:when test="s:lastmod"><xsl:value-of select="translate(substring(s:lastmod,1,19),'T',' ')"/><xsl:text> UTC</xsl:text></xsl:when><xsl:otherwise>—</xsl:otherwise></xsl:choose></td></tr></xsl:for-each>
</tbody></table></div><p class="note">Dates are shown where a recorded content update is available.</p>
</main></body></html>
</xsl:template></xsl:stylesheet>
