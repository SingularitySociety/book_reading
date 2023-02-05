function FindProxyForURL(url, host)
{
  if (host == "example.com") return "PROXY 127.0.0.1:13128";
  if (host == "example.jp") return "PROXY 127.0.0.1:13128";
  return "DIRECT";
}