function FindProxyForURL(url, host)
{
  if (host == "example.com") return "PROXY 127.0.0.1:58888";
  if (host == "example.jp") return "PROXY 127.0.0.1:58888";
  if (host == "example.net") return "PROXY 127.0.0.1:58888";
  return "DIRECT";
}