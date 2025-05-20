# Dawn - Custom Fork

This is a fork of Shopify's [Dawn theme](https://github.com/Shopify/dawn) focused on adding custom features for specific merchant needs.

## Custom Features

### Adhesive Recommendations Component

This theme includes a custom component that recommends appropriate adhesive products based on the main product being viewed:

- **Automatic Ratio Calculation**: Displays the required quantity of adhesive based on a predefined ratio for each product
- **Smart Quantity Updates**: Automatically recalculates required adhesive quantities when the main product quantity changes
- **User-Friendly Selection**: Allows customers to select from recommended adhesives or opt out entirely
- **Price Transparency**: Shows the total cost of the recommended adhesive based on the required quantity

The component is implemented using:
- A Liquid snippet (`snippets/product-adhesive-recommendations.liquid`)
- Dedicated CSS (`assets/component-adhesive-recommendations.css`)
- JavaScript functionality (`assets/adhesive-recommendations.js`)

## Original Dawn Documentation

For information about the base Dawn theme, including getting started guides, developer tools, and contribution guidelines, please refer to the [official Dawn repository](https://github.com/Shopify/dawn).

## License

Copyright (c) 2021-present Shopify Inc. See [LICENSE](/LICENSE.md) for further details.
