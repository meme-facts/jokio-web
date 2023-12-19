import { PropsWithChildren } from "react";
import { Container } from "./styles";
import { FadeLoader } from "react-spinners";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import Icon from "@components/shared/Icon";

interface ILoadingOrErrorScreenProps {
  isError: boolean;
}

export function LoadingOrErrorScreen({ isError }: ILoadingOrErrorScreenProps) {
  if (isError) {
    return (
      <Container>
        <Icon
          styles={{ fontSize: "36px", color: "purple" }}
          icon={ReportProblemIcon}
        />
      </Container>
    );
  }
  return (
    <Container>
      <FadeLoader color="#36d7b7" loading={true} />
    </Container>
  );
}
