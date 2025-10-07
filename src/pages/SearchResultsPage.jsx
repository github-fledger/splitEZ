import { useContext } from "react";
import Spinner from "../components/Spinner";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { AppSearchContext } from "../context/AppSearchContext.jsx";

const SearchResultsPage = () => {
  const { query, results, loading, error } = useContext(AppSearchContext);

  if (!query) return <Typography>No search query providedxx.</Typography>;
  if (loading) return <Spinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h5">Results for "{query}"</Typography>
      {results.length === 0 ? (
        <Typography>No results found.</Typography>
      ) : (
        <List>
          {results.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.title} secondary={item.description} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default SearchResultsPage;
