function FindProxyForURL(url, host)
{
  if (shExpMatch(url, "*example.com*") ||
      shExpMatch(url, "*example.jp*") ||
      shExpMatch(url, "*example.net*")) return "PROXY 127.0.0.1:58888";
  return "DIRECT";
}