const store = {
  channels: {
    zalo: {
      mode: "mock",  // 'mock' -> chưa có token; có token thì set 'live'
      access_token: null,
      refresh_token: null,
      token_expires_at: null
    }
  }
}

module.exports = store