<template>
  <div class="row mb-2 mb-lg-4">
    <div class="col-12 col-lg-3">
      <h4 class="m-0 py-2 p-lg-0 strong">Conversations</h4>
    </div>
    <div class="col-8 col-lg-2">
      <div class="input-group">
        <span class="input-group-text search-icon rounded-pill"
          ><fa :icon="['fas', 'search']" class="text-secondary"
        /></span>
        <input
          type="text"
          class="form-control form-control-sm rounded-pill search-input"
          placeholder="Quick Search"
        />
      </div>
    </div>
    <div class="col-4 col-lg-7 text-end pe-0">
      <button class="btn btn-light btn-sm rounded-pill px-3">
        <fa :icon="['fas', 'filter']" /> Filter
      </button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.search-input {
  border-left: none;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.search-icon {
  background-color: transparent;
  border-right: none;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
</style>
