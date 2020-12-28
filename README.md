# RemindMe Ruqqus

A Ruqqus bot inspired by the !RemindMe one on Reddit

## Setup and Running

1. Create a `.env` file with the following:
```
ID=your-id
TOKEN=your-access-token
REFRESH=your-refresh-token
```

Don't know where to get these? Get the first two at https://ruqqus.com/settings/apps, then the beautiful refresh token here: https://ruqqus-auth.glitch.me/

Note: To make the refresh token, be sure to put their redirect URI in your app settings (first link)

2. `yarn install`
3. `yarn start`
