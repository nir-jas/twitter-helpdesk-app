<template>
  <div class="container px-2 pt-2 py-lg-3 bg-lg-5">
    <div class="d-flex justify-content-between">
      <div>
        <span class="text-secondary small border-bottom pb-1">Updates</span>
      </div>
      <div class="d-flex">
        <div class="text-secondary small d-none d-lg-block">
          Session: 34 Minutes
        </div>
        <div class="text-secondary small ms-5">User: {{ $auth.user.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
