import { MaterialIcons } from "@expo/vector-icons";

const Icons = {};

const Add = () => <MaterialIcons name="add" size={16} />;
const Cancel = () => <MaterialIcons name="cancel" size={16} />;
const Edit = () => <MaterialIcons name="edit" size={16} />;
const Delete = () => <MaterialIcons name="delete" size={16} />;
const Favourite = () => <MaterialIcons name="favorite" size={18} />;
const Notfavourite = () => <MaterialIcons name="favorite-border" size={18} />;
const Sync = () => <MaterialIcons name="sync" size={16} />;

// Compose
Icons.Add = Add;
Icons.Cancel = Cancel;
Icons.Delete = Delete;
Icons.Edit = Edit;
Icons.Sync = Sync;
Icons.Favourite = Favourite;
Icons.Notfavourite = Notfavourite;

export default Icons;
