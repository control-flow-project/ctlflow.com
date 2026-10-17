let response = reqwest::get(format!("{origin}/api/health"))
    .await?.error_for_status()?;
let body: serde_json::Value = response.json().await?;
println!("{}", body["data"]["version"]);
