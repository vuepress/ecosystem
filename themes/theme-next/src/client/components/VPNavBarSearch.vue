<template>
  <div class="vpNavBarSearch">
    <NavbarSearch />
  </div>
</template>

<style>
.vpNavBarSearch {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .vpNavBarSearch {
    flex-grow: 1;
    padding-left: 24px;
  }
}

@media (min-width: 960px) {
  .vpNavBarSearch {
    padding-left: 32px;
  }
}
</style>
