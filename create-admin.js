# ═══════════════════════════════════════════════════════════════
#  KN Track Flow — Nginx Site Configuration
#  Copy to: /etc/nginx/sites-available/kn-trackflow
#  Enable:  ln -sf /etc/nginx/sites-available/kn-trackflow /etc/nginx/sites-enabled/
#  Reload:  nginx -t && systemctl reload nginx
# ═══════════════════════════════════════════════════════════════

upstream kn_backend {
    server 127.0.0.1:3000;
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name _;  # Replace with your domain or IP

    client_max_body_size 25M;
    keepalive_timeout 65;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Proxy to Node.js
    location / {
        proxy_pass         http://kn_backend;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        'upgrade';
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout    60s;
        proxy_connect_timeout 10s;
        proxy_send_timeout    60s;
    }

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://kn_backend;
        expires 30d;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
    }

    # Security headers
    add_header X-Frame-Options        "SAMEORIGIN"            always;
    add_header X-Content-Type-Options "nosniff"               always;
    add_header X-XSS-Protection       "1; mode=block"         always;
    add_header Referrer-Policy        "strict-origin"          always;
    add_header Permissions-Policy     "geolocation=(), camera=()" always;

    # Hide Nginx version
    server_tokens off;

    # Logging
    access_log /var/log/nginx/kn-trackflow.access.log;
    error_log  /var/log/nginx/kn-trackflow.error.log warn;
}

# ── HTTPS configuration (uncomment after certbot/SSL setup) ────
# server {
#     listen 443 ssl http2;
#     listen [::]:443 ssl http2;
#     server_name yourdomain.com;
#
#     ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
#     ssl_protocols       TLSv1.2 TLSv1.3;
#     ssl_ciphers         HIGH:!aNULL:!MD5;
#     ssl_session_cache   shared:SSL:10m;
#     ssl_session_timeout 10m;
#
#     # ... same location blocks as above ...
# }
#
# server {
#     listen 80;
#     server_name yourdomain.com;
#     return 301 https://$host$request_uri;
# }
