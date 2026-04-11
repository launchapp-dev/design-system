## 0.4.0

### Minor Changes

- Add React adapters for all 108 base components with `La` prefix (e.g. `LaButton`, `LaCard`) — import from `@launchapp/design-system/react`
- Add Svelte 5 wrappers for all components — import from `@launchapp/design-system/svelte`

## 0.3.0

### Minor Changes

- Add `loading` prop to Button component with animated spinner and auto-disabled state

### Patch Changes

- ad78be8: Alpha pre-release testing for npm publishing pipeline

## 0.2.1-alpha.0

### Patch Changes

- Alpha pre-release testing for npm publishing pipeline

## 0.2.0

### Minor Changes

- Pre-release version for testing npm publishing pipeline with alpha tag

### Patch Changes

- 1b9903d: Initial setup for changesets and npm publishing pipeline
- a15f693: Pre-release version for testing npm publishing pipeline and alpha releases

## 0.1.0 (2026-03-19)

### Features

- **ci:** integrate design system workflow skills — TASK-062 ([c461c0f](https://github.com/launchapp-dev/design-system/commit/c461c0f5446ddb11b43cb6b3a02f835ed689aa09))
- **registry:** host registry.json on GitHub Pages [TASK-084] ([5abcd56](https://github.com/launchapp-dev/design-system/commit/5abcd560ff54876c3234eac23b50f8f3f73d352f))
- set up NPM publishing pipeline via GitHub Actions [TASK-087] ([0859a2f](https://github.com/launchapp-dev/design-system/commit/0859a2fdcbadbc6366c3cb9c3588520579cf9837))
- **Table:** add dev-time warning for missing accessible name [TASK-082] ([2d12229](https://github.com/launchapp-dev/design-system/commit/2d122293c32c15b4a66585a24199f86c00de4aee))
- **TASK 034:** Fix Progress: value prop not forwarded to Radix root (aria-v ([9d10630](https://github.com/launchapp-dev/design-system/commit/9d106306377b74ad9ab19ed0b04135203f72d7cd))
- **TASK 035:** Fix FormControl: aria-invalid and aria-describedby on wrappe ([8bf6b46](https://github.com/launchapp-dev/design-system/commit/8bf6b4676bb9c297a9728f0878b9a6202d601cf0))
- **TASK 035:** Fix FormControl: aria-invalid and aria-describedby on wrappe ([eaaefb2](https://github.com/launchapp-dev/design-system/commit/eaaefb291d799fb9d08f6ead3de8886fb661f1cf))
- **TASK 036:** Fix ToastClose: missing aria-label on icon-only close button ([1b3d845](https://github.com/launchapp-dev/design-system/commit/1b3d845fcbee220b6a31b7c03602ef16546f2fe3))
- **TASK 037:** Fix Input and Textarea: error prop does not set aria-invalid ([2f1d37c](https://github.com/launchapp-dev/design-system/commit/2f1d37ccf5f8a414062f5a254ae7336f23937e08))
- **TASK 038:** Chore Badge: add appropriate ARIA role for semantic meaning ([140bd28](https://github.com/launchapp-dev/design-system/commit/140bd28de1ba413a2e7279d8dbda482ff6c6496e))
- **TASK 039:** Chore Skeleton: add aria-hidden or role="status" for loading ([bf9b779](https://github.com/launchapp-dev/design-system/commit/bf9b7791db5fb4f428d8840b8188e611c61aad19))
- **TASK 040:** Chore AvatarImage: enforce alt attribute for image accessibi ([f74abca](https://github.com/launchapp-dev/design-system/commit/f74abcacd725aa0c0aa5b809436a16e98ce47c7f))
- **TASK 040:** Chore AvatarImage: enforce alt attribute for image accessibi ([ab0a60a](https://github.com/launchapp-dev/design-system/commit/ab0a60ad72d95527cfd2fa6dea1f55060f920aae))
- **TASK 041:** Chore Slider: add aria-label to individual thumbs in multi-t ([22c83f6](https://github.com/launchapp-dev/design-system/commit/22c83f6ab9c6accd3d7e5ac9c2326339dbdf292b))
- **TASK 042:** Implement Auth blocks: Login, Sign-up, Forgot Password, OTP ([7ec17b3](https://github.com/launchapp-dev/design-system/commit/7ec17b31b47c6cea8f9b01a6a28303df5645773e))
- **TASK 048:** Implement Documentation & Marketing Website — Foundation (Ne ([234d613](https://github.com/launchapp-dev/design-system/commit/234d61361706ffa9aa3ae8345f554d930452f38f))
- **TASK 049:** Implement Documentation Website — Component docs pages with ([e26a35e](https://github.com/launchapp-dev/design-system/commit/e26a35ed6e45d0b20ad50c9fb64c24126e8f9936))
- **TASK 052:** Implement E-commerce blocks: Product Cards, Shopping Cart, C ([d66b4da](https://github.com/launchapp-dev/design-system/commit/d66b4da276be457d382ca1702b9a0c3e2b3d681e))
- **TASK 067:** a11y: DataTable "rows per page" select missing accessible la ([776abe4](https://github.com/launchapp-dev/design-system/commit/776abe478ebc5870125768148159595d8f1f9a28))
- **TASK 077:** Fix KPICard: add aria-hidden to decorative sparkline chart ([15b9af7](https://github.com/launchapp-dev/design-system/commit/15b9af7980e934994f3287bb44a3330c41c16ad0))
- **TASK-002:** implement Button component with CVA variants ([a953675](https://github.com/launchapp-dev/design-system/commit/a953675666f0b7f7bd87c99ac61ba213901ae209))
- **TASK-005:** implement Select component ([#5](https://github.com/launchapp-dev/design-system/issues/5)) ([78d17a8](https://github.com/launchapp-dev/design-system/commit/78d17a88d44676935987b13da03c2366c388d040))
- **TASK-007:** add Storybook stories for Avatar, Separator, and Tooltip ([2b85a82](https://github.com/launchapp-dev/design-system/commit/2b85a8260c1e6ee8a824378dfec7e91fd22d8d25))
- **TASK-007:** implement Avatar, Separator, and Tooltip components ([d4b64cd](https://github.com/launchapp-dev/design-system/commit/d4b64cd78a661db395316cb771f4fababadfc390))
- **TASK-008:** implement Dialog and AlertDialog components ([45c8d75](https://github.com/launchapp-dev/design-system/commit/45c8d75d622101702ac043e57e4aaefbfe8daeec))
- **TASK-009:** add Storybook stories for DropdownMenu and Popover components ([68fa058](https://github.com/launchapp-dev/design-system/commit/68fa058e777e1fd94c1326fb469996955d87fe7f))
- **TASK-009:** implement DropdownMenu and Popover components ([f1a16ca](https://github.com/launchapp-dev/design-system/commit/f1a16ca0b0958e71d6ffdf6ba1040b3ecc1c8ae4))
- **TASK-010:** implement Toast notification system ([b7bbb97](https://github.com/launchapp-dev/design-system/commit/b7bbb97ddda184e22d752aa817800c4e86ebd85f))
- **TASK-011:** implement Tabs and Accordion components ([3693cef](https://github.com/launchapp-dev/design-system/commit/3693cef5d80aeff48905f5a1fa28dc390672dccd))
- **TASK-012:** add Storybook stories for Toggle, ToggleGroup, and Progress ([373dcde](https://github.com/launchapp-dev/design-system/commit/373dcde9f159d02eba98dc6dfa620d5bc37919b6))
- **TASK-012:** implement Toggle, ToggleGroup, and Progress components ([6a33750](https://github.com/launchapp-dev/design-system/commit/6a33750de8ad6c2e0757fee90ae7b10a0c905971))
- **TASK-013:** configure Storybook 8 with Vite and dark mode ([759b1aa](https://github.com/launchapp-dev/design-system/commit/759b1aaef7545ef4c8449dc99c66a6d98cd928ec))
- **TASK-014:** add Storybook stories for Button, Select, Dialog, AlertDialog, Toast, Tabs, Accordion ([ef05ac5](https://github.com/launchapp-dev/design-system/commit/ef05ac51cdbcf7c3c5735576ea42313c7a10a68f))
- **TASK-015:** add RadioGroup, Slider, and Textarea components ([f702a63](https://github.com/launchapp-dev/design-system/commit/f702a636289fff04e8e2c71d4697a1239c185893))
- **TASK-016:** implement Form component with react-hook-form and Zod integration ([fd46f8c](https://github.com/launchapp-dev/design-system/commit/fd46f8cd9bebda8432bb2425121d015c7ffa4f35))
- **TASK-017:** add Storybook stories for NavigationMenu, Breadcrumb, and Pagination ([bc4d0bd](https://github.com/launchapp-dev/design-system/commit/bc4d0bd1e34800519f69186d604d049369fdf9a8))
- **TASK-017:** implement NavigationMenu, Breadcrumb, and Pagination components ([61bda4d](https://github.com/launchapp-dev/design-system/commit/61bda4dc623d077c854d1d3dff0fdd6450243fc2))
- **TASK-018:** expand Command Palette stories with variants and edge cases ([1e05a04](https://github.com/launchapp-dev/design-system/commit/1e05a04456a27d0a2e9dee64095d975b7993d02a))
- **TASK-018:** implement Command Palette (cmdk) component ([6ed4785](https://github.com/launchapp-dev/design-system/commit/6ed47859c170291f69795e7db5209bb770b8d875))
- **TASK-019:** add stories for Table, Skeleton, and Collapsible components ([ed5c844](https://github.com/launchapp-dev/design-system/commit/ed5c844077f8148717eb768f2fb7772f3819a309))
- **TASK-019:** implement Table, Skeleton, and Collapsible components ([e3f667b](https://github.com/launchapp-dev/design-system/commit/e3f667b57d2f01efb5ba09887f531d91afdf5276))
- **TASK-020:** enhance DataTable stories with typed meta, argTypes, and expanded variants ([1838d74](https://github.com/launchapp-dev/design-system/commit/1838d74e455da0c7368617c50a036aa06e2d98e6))
- **TASK-020:** restore DataTable component, index exports, and @tanstack/react-table dependency ([faa6f33](https://github.com/launchapp-dev/design-system/commit/faa6f33db0f7f282538d65d317754728071c1dc1))
- **TASK-021:** add Storybook stories for Sheet, ScrollArea, AspectRatio, and Resizable ([df5bde4](https://github.com/launchapp-dev/design-system/commit/df5bde411daf0dbe331f6a81c8537cc271d6078f))
- **TASK-021:** implement Sheet, ScrollArea, AspectRatio, and Resizable components ([701107a](https://github.com/launchapp-dev/design-system/commit/701107a1437e3a9c7d4fcab66605de30385421e4))
- **TASK-022:** add Interactive and DarkMode stories for Alert and Sonner ([b08e82e](https://github.com/launchapp-dev/design-system/commit/b08e82e1073ea2aaba32b0f99f0a3c0896254283))
- **TASK-022:** implement Alert and Sonner components ([b7a54b6](https://github.com/launchapp-dev/design-system/commit/b7a54b61e6cfc17f0586bc026f529d70f54e71a6))
- **TASK-023:** implement NavigationMenu, Breadcrumb, and Pagination components ([c9328cf](https://github.com/launchapp-dev/design-system/commit/c9328cfe52b1e42863c78fb351889488d4955753))
- **TASK-024:** add striped row variant to Table component ([9becbb5](https://github.com/launchapp-dev/design-system/commit/9becbb573207f3e4ace16f8f46f0a7069b85b17c))
- **TASK-025:** add info variant to Alert component ([74c150a](https://github.com/launchapp-dev/design-system/commit/74c150aced778e80edb0f5139cd28a473add1f08))
- **TASK-026:** implement Calendar and DatePicker components ([e3715da](https://github.com/launchapp-dev/design-system/commit/e3715da1d8329d5191d6f04cc43d52ea645b5da2))
- **TASK-027:** implement Combobox and Multi-Select components ([c3c1047](https://github.com/launchapp-dev/design-system/commit/c3c1047ed2979065d0237ead72f53c813c8fb7e7))
- **TASK-028:** implement Toolbar, ContextMenu, and Menubar components ([619dfe2](https://github.com/launchapp-dev/design-system/commit/619dfe265eac6f4d10ab17999c64bb6bd65b6903))
- **TASK-029:** implement Chart, KPICard, and StatDisplay components ([2faaca6](https://github.com/launchapp-dev/design-system/commit/2faaca6750b37413e3aa6d01ba55ecf3c8848f27))
- **TASK-030:** upgrade Storybook from v8 to v10 ([9a36a3e](https://github.com/launchapp-dev/design-system/commit/9a36a3e8c4abd643efc10fbe745fea002dfb9cd9))
- **TASK-032:** implement VisuallyHidden, Portal, and FocusScope utility components ([89bf066](https://github.com/launchapp-dev/design-system/commit/89bf0662d784edb36b519bc780b7fcd3ead2b106))
- **TASK-033:** implement Combobox and MultiSelect components ([9e900e2](https://github.com/launchapp-dev/design-system/commit/9e900e22113088e87d952f0ce853b3d2a25729eb))
- **TASK-038:** add default role="img" to Badge for WCAG 1.3.1 compliance ([35ba4c1](https://github.com/launchapp-dev/design-system/commit/35ba4c1d02d3971e5c933f7e8248ca26ffa47624))
- **TASK-038:** use role="alert" for destructive badges to communicate urgency ([dd5b6a4](https://github.com/launchapp-dev/design-system/commit/dd5b6a4686b94b00b05c4d1dea1feeb2cf944eb6))
- **TASK-040:** add runtime warning when AvatarImage alt is missing ([5c86319](https://github.com/launchapp-dev/design-system/commit/5c86319bee3fe171c9f1e08d4496a84199ecf07e))
- **TASK-040:** enforce required alt attribute on AvatarImage for WCAG 1.1.1 ([c5e1507](https://github.com/launchapp-dev/design-system/commit/c5e1507ef6abc9322e698bd9e68cd7154c4146c9))
- **TASK-041:** add aria-label to Slider thumbs for WCAG 4.1.2 compliance ([d3b80f4](https://github.com/launchapp-dev/design-system/commit/d3b80f41cd81b52e59228aa21e38bf503975954a))
- **TASK-042:** implement auth blocks — LoginForm, SignUpForm, ForgotPasswordForm, OTPVerification ([27602d4](https://github.com/launchapp-dev/design-system/commit/27602d4b08363d7b94d3116e7be3909f5a8c36e5))
- **TASK-043:** implement AppSidebar, TopNav, and MobileNavDrawer navigation blocks ([3e19411](https://github.com/launchapp-dev/design-system/commit/3e194111f8689e089a50481d3324b9eff0996a57))
- **TASK-044:** implement dashboard blocks — StatsOverview, ActivityFeed, MetricCards ([7b37776](https://github.com/launchapp-dev/design-system/commit/7b3777666795a497abf70b7110a41d980d992b5f))
- **TASK-045:** implement settings blocks — Profile, Account, Notifications, Billing ([d6567d1](https://github.com/launchapp-dev/design-system/commit/d6567d13505d1fab711f75ac520425fb52abf766))
- **TASK-047:** implement marketing blocks - HeroSection, FeatureGrid, PricingTable, TestimonialCarousel ([c88aea1](https://github.com/launchapp-dev/design-system/commit/c88aea1e87de4fbc40532a9e10f0f9867cf42180))
- **TASK-048:** implement docs site foundation — Next.js App Router + layout ([0598772](https://github.com/launchapp-dev/design-system/commit/0598772702fec1ae8567d66d0b1575534b2204a8))
- **TASK-049:** add live previews for all 52 components ([9af6e66](https://github.com/launchapp-dev/design-system/commit/9af6e6670f9e2f43a9681350e942c7fae8daa4ef))
- **TASK-049:** implement documentation website with component docs and live previews ([02e3d88](https://github.com/launchapp-dev/design-system/commit/02e3d8834871091f5192877b19729c09d855602c))
- **TASK-050:** implement FullDataTable and KanbanBoard data blocks ([cc99079](https://github.com/launchapp-dev/design-system/commit/cc9907987f9a4ae4d9505047fb08f914e724e8c2))
- **TASK-052:** implement e-commerce blocks — ProductCard, ShoppingCart, CheckoutForm ([73f9adb](https://github.com/launchapp-dev/design-system/commit/73f9adb74decbee2c0b72964960ac55b4dc54673))
- **TASK-054:** fix blocks barrel export — add all missing block categories ([87e2643](https://github.com/launchapp-dev/design-system/commit/87e26436a830cf430e253304c7b05a544737cb6e))
- **TASK-055:** add shadcn/ui registry.json with all component and block entries ([3bb04c1](https://github.com/launchapp-dev/design-system/commit/3bb04c10b30a02a342c35c4ea049516266bb0cc2))
- **TASK-057:** add React.forwardRef to Sonner and Resizable components ([bd8d2e1](https://github.com/launchapp-dev/design-system/commit/bd8d2e16505e4c74780fb529b0ba903ede4895a5))
- **TASK-058:** add imageBackground variant to HeroSection ([6a7746b](https://github.com/launchapp-dev/design-system/commit/6a7746ba856099619fab14a4c43f0f42e2433a23))
- **TASK-059:** convert CheckoutForm to multi-step wizard ([3d96398](https://github.com/launchapp-dev/design-system/commit/3d963986642514b5829064e0f8ce26d15ab14f31))
- **TASK-060:** add SearchableDataTable block to data blocks ([00b4c09](https://github.com/launchapp-dev/design-system/commit/00b4c09697520ca48f50a9b8f1701b19c2677348))
- **TASK-061:** rename AudioGenius to LaunchApp across entire codebase ([8409db1](https://github.com/launchapp-dev/design-system/commit/8409db1974c0dfb50b1917be0224118479a0b64a))
- **TASK-062:** integrate product-skills — strategist, competitive analyst, RICE/OKR ([357aa38](https://github.com/launchapp-dev/design-system/commit/357aa3816cfc9e3deaf7f21359536c365fef74a6))
- **TASK-062:** integrate UX research, design engineering, and code quality skills ([1d29d5e](https://github.com/launchapp-dev/design-system/commit/1d29d5e6250129f83c10d19fbc20e89afb2f546c))
- **TASK-062:** wire storybook and changelog phases into component workflow ([ed37b96](https://github.com/launchapp-dev/design-system/commit/ed37b9650d07ca792043f86ce8b66bed22381020))
- **TASK-064:** add custom AO skills for design system component authoring ([6925263](https://github.com/launchapp-dev/design-system/commit/6925263b80e6c288036e7e3c5250635246821b3b))
- **TASK-073:** add accessible name and role to ChartContainer ([dc21854](https://github.com/launchapp-dev/design-system/commit/dc21854305bb096efbeed142b52a5310c8be7e93))
- **workflows:** integrate ao-skills and product-skills into design system pipelines [TASK-062] ([ae5803d](https://github.com/launchapp-dev/design-system/commit/ae5803da585c1bc61dc4624cb33e934d55d31435))

### Bug Fixes

- **Checkbox:** add aria-hidden to decorative indicator SVGs [TASK-078] ([c5e8a01](https://github.com/launchapp-dev/design-system/commit/c5e8a016692846623689c563b3cd008684eee0ab))
- **KPICard:** add aria-hidden to decorative sparkline container [TASK-077] ([06fe2a4](https://github.com/launchapp-dev/design-system/commit/06fe2a40c5338abcd383b853b265ad899fd13f4e))
- **Progress:** add dev-time warning for missing accessible name [TASK-080] ([ad2a924](https://github.com/launchapp-dev/design-system/commit/ad2a92457ceda3f9ca2ed35ff373ab6fd8fe51a7))
- **RadioGroup:** add aria-hidden to decorative indicator SVG [TASK-079] ([7090b62](https://github.com/launchapp-dev/design-system/commit/7090b62c1d040fd865693eb2f3c66dfc2a36f253))
- **RadioGroup:** resolve TypeScript interface conflict with Radix orientation prop ([88e49ee](https://github.com/launchapp-dev/design-system/commit/88e49eef97d1228fb967cf818252c8f514c5d98a))
- **TASK-034:** forward value prop to ProgressPrimitive.Root for aria-valuenow ([312e78c](https://github.com/launchapp-dev/design-system/commit/312e78c7f74628cebf663334592d58d898c9f553))
- **TASK-035:** use Slot in FormControl to pass ARIA attrs to actual input ([2d76bb1](https://github.com/launchapp-dev/design-system/commit/2d76bb1547b59a741dab76333037f649fbb5cdd1))
- **TASK-036:** add aria-label to ToastClose icon-only button ([dc6f827](https://github.com/launchapp-dev/design-system/commit/dc6f827b1cd2deba9325ab137a94ec152eebc4c1))
- **TASK-037:** add aria-invalid to Input and Textarea when error prop is true ([dea3c50](https://github.com/launchapp-dev/design-system/commit/dea3c50965f82d90b48e35ca83b3373094623c9f))
- **TASK-039:** add aria-hidden to Skeleton for WCAG 1.3.1 compliance ([fc1c98d](https://github.com/launchapp-dev/design-system/commit/fc1c98d1597864471d490b4ecd12967fa48bf631))
- **TASK-048:** resolve @audiogenius/design-system for local development ([cb15abc](https://github.com/launchapp-dev/design-system/commit/cb15abc517aeb173284354a40d8890d3831b6c1c))
- **TASK-049:** correct component prop mismatches in docs previews and registry ([6313902](https://github.com/launchapp-dev/design-system/commit/6313902c4e6b127724f4f2914869a098c83862e3))
- **TASK-049:** remove .next build artifacts and use Command component for sidebar search ([627c1cb](https://github.com/launchapp-dev/design-system/commit/627c1cb5a1fda4ab46482243d625ce2899a4cb0f))
- **TASK-050:** address PR review — replace raw HTML with design system components ([a8c502a](https://github.com/launchapp-dev/design-system/commit/a8c502a3e8e760e95bb97c459a4906fd08db7497))
- **TASK-051:** correct Badge ARIA roles — remove role=img default, use status for destructive ([3a6d67c](https://github.com/launchapp-dev/design-system/commit/3a6d67cb514f581e19ae614c408adc73e1662806))
- **TASK-052:** resolve TypeScript errors in CheckoutForm and ProductCard ([3021e8d](https://github.com/launchapp-dev/design-system/commit/3021e8d998907e66043d8bf3ba372b3bb28048d1))
- **TASK-065:** add aria-sort and keyboard activation to DataTable sort headers ([70626f0](https://github.com/launchapp-dev/design-system/commit/70626f0374f84e907c95b0dd7620ad6f43e4a691))
- **TASK-066:** add aria-label to DataTable filter Input ([a2439a8](https://github.com/launchapp-dev/design-system/commit/a2439a8c2619d3013d659e7e1ebe92461ae45e90))
- **TASK-067:** add aria-label to DataTable rows-per-page select ([a98d71a](https://github.com/launchapp-dev/design-system/commit/a98d71a106deb85b07e25491ce9e6ec86c20764f))
- **TASK-071:** add aria-controls to Combobox trigger for WCAG 4.1.2 compliance ([069e849](https://github.com/launchapp-dev/design-system/commit/069e8490ba8ed6cf8c66abfc3d60ffc962645293))
- **TASK-072:** a11y — add aria-controls and aria-selected to MultiSelect ([f5ccba1](https://github.com/launchapp-dev/design-system/commit/f5ccba15c54e7234972f6501b5763b21b7de006a))
- **TASK-074:** add accessible text alternatives for KPICard trend indicators ([92c86d4](https://github.com/launchapp-dev/design-system/commit/92c86d4f870870e6a11f837fdae55961e7b0f0f0))
- **TASK-075:** add aria-haspopup and aria-expanded to DatePicker trigger ([2fc4eb2](https://github.com/launchapp-dev/design-system/commit/2fc4eb22247c9b55511cb14b8008c3b73ffcb454))
- **TASK-076:** remove auto-assigned role=status from destructive Badge variants ([9b1c6aa](https://github.com/launchapp-dev/design-system/commit/9b1c6aa172126ffa06857e1bcf68938f10a4dea7))
