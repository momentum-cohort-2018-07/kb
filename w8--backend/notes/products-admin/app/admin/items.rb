ActiveAdmin.register Item do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

# customize the index
  # index do
  #   column :name
  #   column :category
  #   column :price
  # end

# even fancier index
# renames a column
# does some ruby with values in a column
  index do
    column :name do |item|
      link_to item.name, admin_item_path(item.id)
    end
    column 'Item Detail', :description
    column :quantity
    column :category
    column :price do |item|
      number_to_currency(item.price)
    end
  end

  # customize the show page
  show do
    panel "Item Details" do
      h3 item.name
      span 'Category:', class: 'label'
      para item.category.name
      para item.quantity.nil? ? '0' : item.quantity
      div do
        simple_format item.description
      end
    end
  end

end
