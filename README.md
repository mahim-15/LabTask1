# LabTask1 WordPress site

## Run locally

This workspace uses XAMPP installed at `C:\xampp` and the WordPress files in
`wordpress\`.

1. Open this folder in VS Code.
2. Run **Tasks: Run Task** and select **Start WordPress database**.
3. Run **Tasks: Run Task** and select **Run WordPress locally**.
4. Open [http://127.0.0.1:8000](http://127.0.0.1:8000) to finish the WordPress
   installation in your browser.

The local database listens only on `127.0.0.1:3307`, separately from other
MySQL services. The WordPress database configuration is kept in the ignored
`wordpress\wp-config.php` file.
