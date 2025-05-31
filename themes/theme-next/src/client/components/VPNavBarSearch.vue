<template>
  <div class="vp-navbar-search">
    <NavbarSearch />
  </div>
</template>

<style>
.vp-navbar-search {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .vp-navbar-search {
    flex-grow: 1;
    padding-left: 24px;
  }
}

@media (min-width: 960px) {
  .vp-navbar-search {
    padding-left: 32px;
  }
}
</style>
