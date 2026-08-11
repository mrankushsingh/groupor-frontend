<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  exclude-result-prefixes="sm image">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Groupor Sitemap</title>
        <link rel="icon" href="/groupor-logo.png" type="image/png"/>
        <style>
          :root { color-scheme: light; }
          body {
            margin: 0;
            font: 15px/1.5 system-ui, -apple-system, Segoe UI, sans-serif;
            background: #f4faf8;
            color: #112233;
          }
          header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 20px 24px;
            background: #112233;
            color: #fff;
          }
          header img { width: 40px; height: 40px; border-radius: 10px; background: #fff; }
          header h1 { margin: 0; font-size: 1.15rem; }
          header p { margin: 2px 0 0; color: rgba(255,255,255,.72); font-size: .85rem; }
          main { max-width: 960px; margin: 0 auto; padding: 24px; }
          .meta { margin-bottom: 16px; color: #4b5563; }
          table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
          th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
          th { background: #ecfdf5; font-size: .8rem; text-transform: uppercase; letter-spacing: .04em; color: #0f766e; }
          a { color: #0f766e; word-break: break-all; }
          .thumb { width: 36px; height: 36px; object-fit: cover; border-radius: 8px; background: #e5e7eb; }
          footer { padding: 24px; text-align: center; color: #6b7280; font-size: .85rem; }
        </style>
      </head>
      <body>
        <header>
          <img src="/groupor-logo.png" alt="Groupor"/>
          <div>
            <h1>Groupor Sitemap</h1>
            <p>Find. Connect. Grow together.</p>
          </div>
        </header>
        <main>
          <p class="meta">
            <xsl:value-of select="count(sm:urlset/sm:url)"/> URLs for search engines.
            This is an XML sitemap styled for humans — crawlers still read the raw XML.
          </p>
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>URL</th>
                <th>Updated</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">
                <tr>
                  <td>
                    <xsl:choose>
                      <xsl:when test="image:image/image:loc">
                        <img class="thumb" src="{image:image/image:loc}" alt=""/>
                      </xsl:when>
                      <xsl:otherwise>—</xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
                  <td><xsl:value-of select="sm:lastmod"/></td>
                  <td><xsl:value-of select="sm:priority"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
        <footer>© Groupor — WhatsApp group directory</footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
