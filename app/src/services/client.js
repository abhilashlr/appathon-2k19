const APP = {
  client: null,
  currentUser: null,

  /**
   * Entry poing of the app.
   * @param {FreshClient} client
   */
  init(client) {
    this.client = client;

    console.log('---INIT---');
    console.log(this.client);

    return Promise.all([this.fetchLoggedInUser(), this.fetchCurrentDomain()]).then(
      () => {
        this.cacheList();

        this.requestFilter();
      }
    );
  },

  /**
   * Gets current logged in user
   */
  fetchLoggedInUser() {
    return this.client.data.get("loggedInUser").then(({ loggedInUser }) => {
      console.log('---Logged IN User---');
      this.currentUser = loggedInUser;
    });
  },

  /**
   * Gets current domain
   */
  fetchCurrentDomain() {
    return this.client.data.get("domainName").then(({ domainName }) => {
      console.log('---Current Domain---');
      this.currentDomain = domainName;
    });
  },

  /**
   * @experimental
   * Not used anywhere at this point in time. But can be used to map small talks
   * of "Hey open {first name last name} lead"
   * @param {String} type
   * @param {String} id
   */
  navigateToEntity(type, id) {
    this.client.interface.trigger("show", {
      id: type,
      value: id
    });
  },

  /**
   * Store the list of last used bookmark in MP Datastore.
   */
  cacheList() {
    this.client.db.update(`${this.currentUser.id}`, "append", {
      recentUsed: [
        {
          id: "1",
          text: "Get me leads last contacted in the last month"
        }
      ]
    });
  },

  // [TODO]
  /**
   * Fetch data from the API (filters). Move next data processing for
   * query construction.
   */
  requestFilter() {
    this.client.request.get("URL", {}).then(
      data => {
        //handle "data"
        //"data" is a json string with status, headers, and response.
      },
      () => {
        this.client.interface.trigger("showNotify", {
          type: "danger",
          message:
            "There was an error processing your request. Please try later"
        });
      }
    );
  },

  // [TODO]
  /**
   * In case of not supportive MP events, use `postMessage` and send the feed
   * to window.top and do stuff.
   */
  navigatorPostFilter() {
    this.postMessage({
      actor: "navigateToDetailPage",
      entity: "lead",
      entityID: "1"
    });
  },

  /**
   * Internally frame the postMessage API with application param as the client product
   * name. DRY code.
   * this.client.context.product = freshsales (based on manifest.json)
   * @param {Object} params
   */
  postMessage(params) {
    window.top.postMessage(
      {
        application: this.client.context.product,
        params
      },
      "*"
    );
  }
};

export default APP;