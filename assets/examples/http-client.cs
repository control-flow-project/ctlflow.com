using var client = new HttpClient();
using var response = await client.GetAsync($"{origin}/api/health");
response.EnsureSuccessStatusCode();
using var body = JsonDocument.Parse(
    await response.Content.ReadAsStringAsync());
Console.WriteLine(body.RootElement.GetProperty("data"));
