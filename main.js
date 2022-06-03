// Root Component

const RootComponent = {};

// Create Vue App

const app = Vue.createApp({
  RootComponent,
  created() {
    window.document.title = this.title;
    this.getRegionsList();
  },
  data() {
    return {
      title: "Εφημερεύοντα Φαρμακεία",
      nowDate: new Date().toDateString(),
      nowDateYear: new Date().getFullYear(),
      message: "Δες τα σημερινά εφημερεύοντα φαρμακεία",
      results: 0,
      region: "",
      selectedRegionId: "",
      returnedPharmachies: null,
      loading: false,
      errored: null,
      data: null,
      regionsList: null,
    };
  },
  methods: {
    regionChanger: function (event) {
      this.region = event.target.selectedOptions[0].textContent;
      this.selectedRegionId = event.target.value;
      this.getPharmachies(this.selectedRegionId);
    },
    getPharmachies(regionName) {
      this.loading = true;
      // console.log(this.loading);
      axios
        .get("api/read.php?region=" + regionName)
        .then((response) => {
          this.returnedPharmachies = response;
          //console.log(this.returnedPharmachies);
          if (this.errored == null) {
            if (
              this.returnedPharmachies.data.data == "" ||
              this.returnedPharmachies.data.data == null
            ) {
              this.results = 0;
              this.data = null;
              return alert("Δεν βρέθηκαν φαρμακεία!");
            }
            this.results = this.returnedPharmachies.data.data.length;
            this.data = this.returnedPharmachies.data.data;
            this.data.forEach((item) => {
              let orario = item.orario;
              var openNow = /ΑΝΟΙΧΤΟ ΤΩΡΑ/.test(orario);
              if (openNow) {
                item.open = openNow;
              } else {
                item.open = openNow;
              }
              //console.log(item.open);
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.errored = error;
        })
        .finally(() => {
          this.loading = false;
          // console.log(this.loading);
        });
    },
    getRegionsList() {
      axios
        .get("api/read.php?allregions=true")
        .then((response) => {
          this.regionsList = response.data;
          //console.log(this.regionsList[600]);
        })
        .catch((error) => {
          console.log(error);
          this.errored = error;
        });
    },
  },
});

// Components

app.component("pharmachy", {
  props: ["title", "phone", "address", "orario", "opened"],
  template: `
    <div id='Shadowdivs' class='container p-3 my-3 bg-dark text-white text-center'>
      <h1>{{title}}</h1>
      <br>
      <p id='phone'>{{phone}}</p>
      <p id='address'>{{address}}</p>
      <p id='orario' v-if="opened" style="color:yellow;font-weight:bold">{{orario}}</p>
      <p id='orario' v-else>{{orario}}</p>
    </div>
    `,
});

app.component("navbar", {
  props: ["title"],
  template: `
   <nav class="navbar navbar-expand-md bg-dark navbar-dark">
    <a class="navbar-brand p-2" href=".">
        <img src="Images/Logo/icon.png" alt="Logo" style="width:40px;">
        {{title}}
    </a> 
  </nav>
  <br>
    `,
});

app.component("region", {
  props: ["regiondata"],
  template: `
   <form>
        <div class="text-center form-group form-group-*">
          <label for="sel1"><p><strong>Διάλεξε Περιοχή:</strong></p></label>
          <select class="form-control" id="selected">
            <option disabled selected value> -- δώσε μια επιλογή -- </option>
            <option v-for="region in regiondata" :key="region.value" 
  :value="region.value" >{{region.name}}</option>
          </select>
        </div><br>
        </form>
    `,
});

app.component("custom-footer", {
  props: ["region", "date", "results", "author", "year"],
  template: `
    <div class="text-center container">
      <p><strong>Περιοχή: </strong><span><i><u id="perioxi">{{region}}</u></i></span></p>
      <p><strong>Ημέρα: </strong><span><i><u id="date">{{date}}</u></i></span></p>
      <p><strong>Αποτελέσματα: </strong><span><i><u id="nres">{{results}}</u></i></span></p>
      <br>
      <footer><small><i>&#169;{{year}} {{author}}</i></small></footer>
    </div>
    `,
});

app.component("loading-spinner", {
  template: `
    <div class="text-center mt-5">
      <div class="spinner-border" role="status">
      </div>
    </div>
  `,
});

// Mount App

app.mount("#app");
