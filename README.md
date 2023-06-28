# future-home CLI

A CLI for future-home.

## Configuring

### Google Maps API access
Get Google API key for routes API from here: https://developers.google.com/maps/documentation/routes/get-api-key

- Set it into `.env` file like so:
   * `GOOGLE_MAPS_API_KEY=<my api key>`

OR
- Export env variable `GOOGLE_MAPS_API_KEY`

### Setting up places of interests

Create `config.json` at the root of the project and set up places of interests like so: 
```bash
{
  "interests": [
    {
      "name": "Climbing Gym",
      "url": "http://google.com",
      "address": "Olympus 3, 6832 EL Arnhem, Netherlands"
    }
  ]
}
```


## Running

```bash
yarn
yarn link
future-home <the address you want to get distances from>
```


## TODO

- [ ] Set up interests in a way that we can duplicate names and the distance to the closest one is returned
- [ ] Prettier print / UI
- [ ] Grading / Gravity of an interest, like A-F or 1-5. Giving the ability to assign a final score for the home.
- [ ] More home information like square meterage, number of rooms etc. With grading so those can be used as a parameter to final score

# License

DFSMH - See LICENSE 

